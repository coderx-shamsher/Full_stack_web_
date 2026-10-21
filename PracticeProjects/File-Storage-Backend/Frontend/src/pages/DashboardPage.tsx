
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, UploadCloud, Files, Folder, HardDrive, Clock } from "lucide-react";
import FileTable from "../components/FileTable";
import { mockFiles } from "../features/files/data/mockFiles";
import type { FileItem, FileTypes } from "../features/files/types/file.types";
import FileUpload from "../features/files/FileUpload";


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const IMAGE_EXTENSIONS = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
    "bmp",
];

function getFileType(file: File): FileTypes | null {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension) return null;

    if (extension === "pdf") return "PDF";

    if (IMAGE_EXTENSIONS.includes(extension)) {
        return "Image";
    }

    if (["xls", "xlsx", "csv"].includes(extension)) {
        return "Excel";
    }

    if (["txt", "md"].includes(extension)) {
        return "Text";
    }

    return null;
}

function formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DashboardPage() {
    const [files, setFiles] = useState<FileItem[]>(mockFiles);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [notice, setNotice] = useState("");

    const [originalFiles, setOriginalFiles] = useState<
        Map<FileItem["id"], File>
    >(() => new Map());

    const [selectedFile, setSelectedFile] = useState<{
        item: FileItem;
        file: File;
    } | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewText, setPreviewText] = useState("");

    const filteredFiles = useMemo(
        () =>
            files.filter((file) =>
                file.name.toLowerCase().includes(search.trim().toLowerCase()),
            ),
        [files, search],
    );

    const folderCount = files.filter((file) => file.type === "Folder").length;


    //   function handleUpload(pickedFiles: File[]) {
    //     const validFiles: FileItem[] = [];
    //     const errors: string[] = [];

    //     pickedFiles.forEach((file, index) => {
    //       // 1. Check file size
    //       if (file.size > MAX_FILE_SIZE) {
    //         errors.push(`${file.name}: exceeds 10 MB`);
    //         return;
    //       }

    //       // 2. Check file type
    //       const fileType = getFileType(file);

    //       if (!fileType) {
    //         errors.push(`${file.name}: unsupported file type`);
    //         return;
    //       }

    //       // 3. Add valid file to the list
    //       validFiles.push({
    //         id: Date.now() + index,
    //         name: file.name,
    //         type: fileType,
    //         size: formatSize(file.size),
    //         modified: new Date(file.lastModified).toLocaleDateString(),
    //       });
    //     });

    //     // Add valid files without removing existing files
    //     if (validFiles.length > 0) {
    //       setFiles((previousFiles) => [
    //         ...validFiles,
    //         ...previousFiles,
    //       ]);
    //     }

    //     // Show the result
    //     if (errors.length > 0 && validFiles.length > 0) {
    //       setNotice(
    //         `Added ${validFiles.length} file(s). ${errors.length} file(s) rejected.`
    //       );
    //     } else if (errors.length > 0) {
    //       setNotice(`No files added. ${errors.join("; ")}`);
    //     } else if (validFiles.length > 0) {
    //       setNotice(`${validFiles.length} file(s) added successfully.`);
    //     }
    //   }

    function openPreview(item: FileItem) {
        const file = originalFiles.get(item.id);

        if (!file) {
            setNotice("Original file is unavailable. Please upload it again.");
            return;
        }

        setSelectedFile({ item, file });
    }

    function downloadFile(item: FileItem) {
        const file = originalFiles.get(item.id);

        if (!file) {
            setNotice("File is unavailable. Please upload it again.");
            return;
        }

        const url = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = file.name;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            setPreviewText("");
            return;
        }

        const { file, item } = selectedFile;

        if (item.type === "Image" || item.type === "PDF") {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }

        if (item.type === "Text") {
            let cancelled = false;

            file.text().then((text) => {
                if (!cancelled) {
                    setPreviewText(text);
                }
            }).catch(() => {
                if (!cancelled) {
                    setPreviewText("Unable to read this text file.");
                }
            });

            return () => {
                cancelled = true;
            };
        }

        setPreviewUrl(null);
        setPreviewText("");
    }, [selectedFile]);

    function handleUpload(pickedFiles: File[]) {
        const validFiles: FileItem[] = [];
        const errors: string[] = [];
        const newOriginalFiles = new Map<FileItem["id"], File>();

        pickedFiles.forEach((file, index) => {
            if (file.size > MAX_FILE_SIZE) {
                errors.push(`${file.name}: exceeds 10 MB`);
                return;
            }

            const fileType = getFileType(file);

            if (!fileType) {
                errors.push(`${file.name}: unsupported file type`);
                return;
            }

            const id = Date.now() + index;

            validFiles.push({
                id,
                name: file.name,
                type: fileType,
                size: formatSize(file.size),
                modified: new Date(file.lastModified).toLocaleDateString(),
            });

            // Keep the actual browser File object
            newOriginalFiles.set(id, file);
        });

        if (validFiles.length > 0) {
            setFiles((previous) => [...validFiles, ...previous]);

            setOriginalFiles((previous) => {
                const updated = new Map(previous);

                newOriginalFiles.forEach((file, id) => {
                    updated.set(id, file);
                });

                return updated;
            });
        }

        if (errors.length > 0 && validFiles.length > 0) {
            setNotice(
                `Added ${validFiles.length} file(s). ${errors.length} file(s) rejected.`
            );
        } else if (errors.length > 0) {
            setNotice(`No files added. ${errors.join("; ")}`);
        } else if (validFiles.length > 0) {
            setNotice(`${validFiles.length} file(s) added successfully.`);
        }
    }

    function removeSelected() {
        setFiles((current) =>
            current.filter((file) => !selectedIds.includes(file.id)),
        );
        setSelectedIds([]);
        setNotice("Selected demo items removed from the list.");
    }

    return (
        <main className="content">
            <div className="welcome-row">
                <div>
                    <p className="eyebrow">YOUR WORKSPACE</p>
                    <h1>Good to see you, Coder X ✦</h1>
                    <p className="subtitle">
                        Everything you need, organized in one secure place.
                    </p>
                </div>

                {/* file upload feature ->> */}
                <FileUpload onFilesSelected={handleUpload} />

            </div>

            {notice && (
                <div className="notice" role="status">
                    <span>{notice}</span>
                    <button type="button" onClick={() => setNotice("")}>×</button>
                </div>
            )}

            <div className="stats-grid">
                <article className="stat-card">
                    <div className="stat-icon blue"><Files size={22} /></div>
                    <div><p>Total files</p><h2>{files.length}</h2><small>Items in demo</small></div>
                </article>

                <article className="stat-card">
                    <div className="stat-icon green"><Folder size={22} /></div>
                    <div><p>Folders</p><h2>{folderCount}</h2><small>Demo folders</small></div>
                </article>

                <article className="stat-card">
                    <div className="stat-icon purple"><HardDrive size={22} /></div>
                    <div><p>Storage used</p><h2>2.4 <span>GB</span></h2><small>Sample statistic</small></div>
                </article>

                <article className="stat-card">
                    <div className="stat-icon orange"><Clock size={22} /></div>
                    <div><p>Recent activity</p><h2>Today</h2><small>Sample statistic</small></div>
                </article>
            </div>

            <section className="files-panel">
                <div className="files-header">
                    <div>
                        <h2>My Files</h2>
                        <p>Manage and organize your files</p>
                    </div>

                    <div className="files-controls">
                        {selectedIds.length > 0 && (
                            <button
                                className="secondary-button"
                                type="button"
                                onClick={removeSelected}
                            >
                                Remove ({selectedIds.length})
                            </button>
                        )}
                    </div>
                </div>

                <div className="search-box file-search">
                    <Search size={19} />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search files and folders..."
                        aria-label="Search files"
                    />
                </div>

                <FileTable
                    files={filteredFiles}
                    onPreview={openPreview}
                    onDownload={downloadFile}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onFileAction={(file) =>
                        setNotice(
                            `${file.name}: real download and delete actions will be added when the backend is connected.`,
                        )
                    }
                />

                <div className="files-footer">
                    <span>Showing {filteredFiles.length} of {files.length} items</span>
                    <span className="demo-label">Demo data · Not synced to server</span>
                </div>
            </section>
            
            {selectedFile && (
                <div className="preview-backdrop">
                    <section
                        className="preview-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Preview ${selectedFile.file.name}`}
                    >
                        <header className="preview-header">
                            <div>
                                <h2>{selectedFile.file.name}</h2>
                                <p>{selectedFile.item.type} · {selectedFile.item.size}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                aria-label="Close preview"
                            >
                                ✕
                            </button>
                        </header>

                        <div className="preview-content">
                            {selectedFile.item.type === "Image" && previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt={selectedFile.file.name}
                                    className="preview-image"
                                />
                            )}

                            {selectedFile.item.type === "PDF" && previewUrl && (
                                <iframe
                                    src={previewUrl}
                                    title={`Preview of ${selectedFile.file.name}`}
                                    className="preview-pdf"
                                />
                            )}

                            {selectedFile.item.type === "Text" && (
                                <pre className="preview-text">
                                    {previewText || "Loading preview..."}
                                </pre>
                            )}

                            {selectedFile.item.type === "Excel" && (
                                <div className="preview-unavailable">
                                    <p>Excel preview is not available yet.</p>
                                    <p>Download the file to open it in a spreadsheet application.</p>
                                </div>
                            )}
                        </div>

                        <footer className="preview-footer">
                            <button
                                type="button"
                                onClick={() => downloadFile(selectedFile.item)}
                            >
                                Download file
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                            >
                                Close
                            </button>
                        </footer>
                    </section>
                </div>
            )}
        </main>

    );
}
