import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { google } from "googleapis";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import User from "./models/User";
import Analysis from "./models/Analysis";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-student-assistant-kpi9t3235-deepika655.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
//app.use(passport.session());
//app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, {
        profile,
        accessToken,
        refreshToken,
      });
    }
  )
);
function getGmail(req: any) {
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  return google.gmail({
    version: "v1",
    auth: oauth2Client,
  });
}
function getCalendar(req: any) {
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  return google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
}

app.get("/", (req, res) => {
  res.send("AI Student Assistant Backend Running");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/calendar",
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  async (req: any, res) => {
    console.log("========== LOGIN SUCCESS ==========");

    const profile = req.user.profile;

    await User.findOneAndUpdate(
      {
        googleId: profile.id,
      },
      {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.redirect("http://localhost:5173/dashboard");
  }
);

app.get("/api/me", (req: any, res) => {
  console.log("========== /api/me ==========");
  console.log("Cookies:", req.headers.cookie);
  console.log("Session ID:", req.sessionID);
  console.log("User:", req.user);
  console.log("Session:", req.session);

  if (!req.user) {
    return res.status(401).json({
      loggedIn: false,
    });
  }

  const user = req.user.profile;

  res.json({
    loggedIn: true,
    user: {
      id: user.id,
      displayName: user.displayName,
      email: user.emails?.[0]?.value,
      photo: user.photos?.[0]?.value,
    },
  });
});
app.get("/api/emails", async (req: any, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Login Required",
    });
  }

  try {
    const gmail = getGmail(req);

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const messages = response.data.messages || [];

    const emails = [];

    for (const msg of messages) {
      const mail = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
      });

      const headers = mail.data.payload?.headers || [];

      const subject =
        headers.find((h) => h.name === "Subject")?.value || "";

      const from =
        headers.find((h) => h.name === "From")?.value || "";

      emails.push({
        id: msg.id,
        subject,
        from,
        snippet: mail.data.snippet,
      });
    }

    res.json(emails);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to fetch Gmail",
    });
  }
});
app.get("/api/events", async (req: any, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Login Required",
    });
  }

  try {
    const calendar = getCalendar(req);

    const response = await calendar.events.list({
      calendarId: "primary",
      maxResults: 20,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
    });

    res.json(response.data.items || []);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to fetch calendar",
    });
  }
});
app.post("/api/run-ai", async (req: any, res) => {
  console.log("========== RUN AI ==========");
  console.log("Cookies:", req.headers.cookie);
  console.log("Session:", req.session);
  console.log("User:", req.user);

  if (!req.user) {
    return res.status(401).json({
      message: "Login Required",
    });
  }

  try {
    const response = await fetch(
      "https://deepika9062.app.n8n.cloud/webhook/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: req.user.accessToken,
        }),
      }
    );

    console.log("Status:", response.status);

    const text = await response.text();

    console.log("========== RAW RESPONSE ==========");
    console.log(text);

    if (!text) {
      return res.status(500).json({
        error: "n8n returned empty response",
      });
    }

    const data = JSON.parse(text);

    console.log("========== PARSED ==========");
    console.log(data);

    const analysis = Array.isArray(data) ? data[0] : data;

    const saved = await Analysis.create({
      userId: req.user.profile.id,
      title: analysis.title,
      description: analysis.description,
      isEvent: analysis.is_event,
      eventDate: analysis.event_date,
      eventTime: analysis.event_time,
      endDate: analysis.end_date,
      calendarCreated: analysis.is_event,
    });

    console.log("========== SAVED ==========");
    console.log(saved);

    res.json({
      success: true,
      analysis,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Unable to run AI",
    });
  }
});
app.get("/api/analysis", async (req: any, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Login Required",
    });
  }

  try {
    const analyses = await Analysis.find({
      userId: req.user.profile.id,
    }).sort({ createdAt: -1 });

    res.json(analyses);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable to fetch analysis",
    });
  }
});

    
connectDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});