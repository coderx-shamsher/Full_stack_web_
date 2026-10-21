
import { useMemo, useRef, useState } from "react";
import { Search, UploadCloud, Files, Folder, HardDrive, Clock } from "lucide-react";
import FileTable from "../components/FileTable";
import { mockFiles } from "../features/files/data/mockFiles";
import type { FileItem,FileTypes } from "../features/files/types/file.types";
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

function getFileType(file: File): FileType | null {
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
  

  const filteredFiles = useMemo(
    () =>
      files.filter((file) =>
        file.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [files, search],
  );

  const folderCount = files.filter((file) => file.type === "Folder").length;


  function handleUpload(pickedFiles: File[]) {
    const validFiles: FileItem[] = [];
    const errors: string[] = [];
  
    pickedFiles.forEach((file, index) => {
      // 1. Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: exceeds 10 MB`);
        return;
      }
  
      // 2. Check file type
      const fileType = getFileType(file);
  
      if (!fileType) {
        errors.push(`${file.name}: unsupported file type`);
        return;
      }
  
      // 3. Add valid file to the list
      validFiles.push({
        id: Date.now() + index,
        name: file.name,
        type: fileType,
        size: formatSize(file.size),
        modified: new Date(file.lastModified).toLocaleDateString(),
      });
    });
  
    // Add valid files without removing existing files
    if (validFiles.length > 0) {
      setFiles((previousFiles) => [
        ...validFiles,
        ...previousFiles,
      ]);
    }
  
    // Show the result
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
    </main>
  );
}
