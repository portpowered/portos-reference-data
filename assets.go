// Package referencedata distributes the same immutable public documentation
// assets as @portpowered/reference-data. It contains no HTTP or authentication logic.
package referencedata

import (
	"embed"
	"io/fs"
)

//go:embed generated/public
var embedded embed.FS

// Files returns the public release tree with URL-relative paths.
func Files() fs.FS {
	files, err := fs.Sub(embedded, "generated/public")
	if err != nil {
		panic(err) // A missing compile-time directory is a broken distribution.
	}
	return files
}
