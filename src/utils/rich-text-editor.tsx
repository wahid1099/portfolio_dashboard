import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

interface RichTextEditorProps {
  richText: string;
  setRichText: (value: string) => void;
  defaultRichText?: string;
  rows?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  richText,
  setRichText,
  defaultRichText,
  rows = 5,
}) => {
  const handleChange = (value: string) => {
    setRichText(value);
  };

  const rowHeight = 24;
  const editorHeight = rows * rowHeight;

  return (
    <ReactQuill
      className="border-dotted"
      style={{
        height: `${editorHeight}px`,
        marginBottom: "1rem",
      }}
      {...(defaultRichText
        ? { defaultValue: defaultRichText }
        : { value: richText })}
      onChange={handleChange}
      modules={modules}
      theme="snow"
    />
  );
};

export default RichTextEditor;
