import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

let sheets = null;
let isConfigured = false;

// Initialize Google Sheets API if credentials are available
if (
  process.env.GOOGLE_CLIENT_EMAIL &&
  process.env.GOOGLE_PRIVATE_KEY &&
  process.env.GOOGLE_SHEET_ID
) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    sheets = google.sheets({ version: "v4", auth });
    isConfigured = true;
    console.log("✅ Google Sheets API configured");
  } catch (error) {
    console.warn("⚠️  Google Sheets not configured:", error.message);
    console.log("📝 App will run with mock data");
  }
} else {
  console.log("📝 Google Sheets not configured - using mock data");
  console.log("💡 Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in .env to enable");
}

/**
 * Append a row to a Google Sheet
 * @param {string} sheetName - Name of the sheet
 * @param {Array} values - Array of values to append
 */
export const appendRow = async (sheetName, values) => {
  if (!isConfigured || !sheets) {
    console.log(`📝 Mock: Would append to ${sheetName}:`, values);
    return Promise.resolve();
  }

  try {
    // First, check if sheet exists, if not create headers
    const sheetExists = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    // Append the row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [values],
      },
    });
    console.log(`✅ Appended row to ${sheetName}:`, values);
  } catch (error) {
    console.error(`❌ Error appending to ${sheetName}:`, error.message);
    // Don't throw error, just log it so app continues working
    console.log(`📝 Continuing without Google Sheets - data:`, values);
  }
};

/**
 * Get all rows from a Google Sheet
 * @param {string} sheetName - Name of the sheet
 * @returns {Promise<Array>} Array of rows
 */
export const getRows = async (sheetName) => {
  if (!isConfigured || !sheets) {
    console.log(`📝 Mock: Would fetch rows from ${sheetName}`);
    return Promise.resolve([]);
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`❌ Error fetching from ${sheetName}:`, error.message);
    throw error;
  }
};

export { sheets, isConfigured };