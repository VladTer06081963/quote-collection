import { writeFile } from 'fs/promises'
import { join } from 'path'
//added --определить тип параметра quote. Нужно явно указать тип.
interface QuoteData {
  type: 'author' | 'folklore';
  name: string;
  quotes: string[];
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, name, quotes } = body

  const folderPath = type === 'author' ? 'authors' : 'folklore'
  const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}.md`
  const filePath = join(process.cwd(), 'content', 'quotes', folderPath, fileName)

  const content = quotes.map((quote: string) => `- ${quote}`).join('\n')
  const fileContent = `---
${type}: ${name}
---

${content}
`

  try {
    await writeFile(filePath, fileContent)
    return { success: true }
  } catch (error) {
    console.error('Error writing file:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Error uploading quotes'
    })
  }
})
