import { marked } from 'marked'

interface Props {
  content: string
}

export default function ContentRenderer({ content }: Props) {
  const html = marked.parse(content) as string
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
