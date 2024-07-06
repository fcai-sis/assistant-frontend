"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.CHAT_API_URL ?? "http://127.0.0.1:3099", {
  autoConnect: false,
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU1RVREVOVCIsInVzZXJJZCI6IjY2ODA4Yzg2NDk5YzY5ZmVlNGQwOTY0ZCIsImlhdCI6MTcxOTc1Mzg2Nn0.0ZTZ2khDX-rljp4Y2nDcVgx_O5mRLI-APlOCEoGC4Tk",
  },
});
