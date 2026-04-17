import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.ntn_h67571527694zPKq1b6eaj1SgcMOn866u1SAWJgrU5tcKm,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const body = JSON.parse(req.body);

    const { name, email, company, request } = body;

    await notion.pages.create({
      parent: {
        database_id: process.env.a440ca9a734b4177bf4fbbe58cb15e9d,
      },
      properties: {
        Name: {
          title: [
            {
              text: { content: name || "" },
            },
          ],
        },
        Email: {
          email: email || "",
        },
        Company: {
          rich_text: [
            {
              text: { content: company || "" },
            },
          ],
        },
        Request: {
          rich_text: [
            {
              text: { content: request || "" },
            },
          ],
        },
      },
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send to Notion" });
  }
}
