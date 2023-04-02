interface Props {
  content: string;
}
export default function HtmlRenderer({ content }: Props) {
  return (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: content }} />
  );
}
