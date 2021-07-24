import { SiteClient } from 'datocms-client';
const token = process.env.NEXT_PUBLIC_DATOCMS_FULL_KEY;
const client = new SiteClient(token);

export default async function createRecord(req, res) {
  if (req.method === 'POST') {
    console.log()
    const createScrap = await client.items.create({
      itemType: "1003855", // model ID
      ...req.body,
    });

    return res.json({
      dados: 'registrado',
      createScrap: createScrap,
    });
  }

  res.status(404).json({ message: 'Erro' });
}

