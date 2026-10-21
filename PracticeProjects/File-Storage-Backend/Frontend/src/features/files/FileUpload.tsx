
import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

type FileUploadProps = {
    onFilesSelected: (files: File[]) => void;
};

export default function FileUpload({
    onFilesSelected,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    function handleFiles(files: FileList | null) {
        if (!files || files.length === 0) return;

        onFilesSelected(Array.from(files));
    }

    return (
        <section
            className={`upload-area ${isDragging ? "dragging" : ""}`}
            onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                handleFiles(event.dataTransfer.files);
            }}
        >
            {/* <input
                ref={inputRef}
                type="file"
                multiple
                hidden
                onChange={(event) => {
                    handleFiles(event.target.files);
                    event.target.value = "";
                }}
            /> */}

            <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.bmp,.xls,.xlsx,.csv,.txt,.md"
                onChange={(event) => {
                    const selectedFiles = Array.from(
                        event.target.files ?? []
                    );

                    if (selectedFiles.length > 0) {
                        onFilesSelected(selectedFiles);
                    }

                    // Same file ko dobara select karne ki permission
                    event.target.value = "";
                }}
                hidden
            />

            <div className="upload-icon">
                <UploadCloud size={28} />
            </div>

            <h3>Upload your files</h3>

            <button
                type="button"
                className="primary-button"
                onClick={() => inputRef.current?.click()}
            >
                Choose files
            </button>

            {/* <small>Multiple files supported</small> */}
        </section>
    );
}
