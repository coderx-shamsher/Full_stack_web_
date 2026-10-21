import type { FileItem } from "../features/files/types/file.types";

interface FileTableProps {
    files: FileItem[];
    selectedIds: number[];
    onSelectionChange: (ids: number[]) => void;
    onFileAction: (file:FileItem) => void;
}

function FileTypeBadge({ type }: { type: FileItem["type"] }) {
    return (
      <span className={`type-badge ${type.toLowerCase()}`}>
        {type}
      </span>
    );
  }
  
  function FileIcon({ type }: { type: FileItem["type"] }) {
    const icons: Record<FileItem["type"], string> = {
      Folder: "📁",
      PDF: "📕",
      Image: "🖼️",
      Excel: "📊",
      Text: "📄",
    };
  
    return (
      <span className={`file-icon ${type.toLowerCase()}`} aria-hidden="true">
        {icons[type]}
      </span>
    );
  }
  
  export default function FileTable({
    files,
    selectedIds,
    onSelectionChange,
    onFileAction,
  }: FileTableProps) {
    const allSelected =
      files.length > 0 &&
      files.every((file) => selectedIds.includes(file.id));
  
    function toggleFile(id: number, checked: boolean) {
      onSelectionChange(
        checked
          ? [...new Set([...selectedIds, id])]
          : selectedIds.filter((selectedId) => selectedId !== id),
      );
    }
  
    return (
      <div className="table-scroll">
        <table className="files-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="Select all files"
                  checked={allSelected}
                  onChange={(event) =>
                    onSelectionChange(
                      event.target.checked
                        ? [...new Set([...selectedIds, ...files.map((file) => file.id)])]
                        : selectedIds.filter(
                            (id) => !files.some((file) => file.id === id),
                          ),
                    )
                  }
                />
              </th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select ${file.name}`}
                    checked={selectedIds.includes(file.id)}
                    onChange={(event) =>
                      toggleFile(file.id, event.target.checked)
                    }
                  />
                </td>
  
                <td>
                  <div className="file-name">
                    <FileIcon type={file.type} />
                    <span>{file.name}</span>
                  </div>
                </td>
  
                <td><FileTypeBadge type={file.type} /></td>
                <td className="muted-cell">{file.size}</td>
                <td className="muted-cell">{file.modified}</td>
  
                <td>
                  <button
                    className="icon-button row-action"
                    type="button"
                    aria-label={`Actions for ${file.name}`}
                    onClick={() => onFileAction(file)}
                  >
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {files.length === 0 && (
          <div className="empty-state">
            <strong>No files found</strong>
            <span>Try another search or upload a file.</span>
          </div>
        )}
      </div>
    );
  }