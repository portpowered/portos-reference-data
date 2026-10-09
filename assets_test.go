package referencedata

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io/fs"
	"os"
	"testing"
)

func TestEmbeddedReleaseMatchesManifest(t *testing.T) {
	data, err := fs.ReadFile(Files(), "docs/references/manifest.json")
	if err != nil {
		t.Fatal(err)
	}
	var manifest struct {
		Version string `json:"version"`
		Files   []struct {
			Path   string `json:"path"`
			Bytes  int    `json:"bytes"`
			SHA256 string `json:"sha256"`
		} `json:"files"`
	}
	if err := json.Unmarshal(data, &manifest); err != nil {
		t.Fatal(err)
	}
	packageJSON, err := os.ReadFile("package.json")
	if err != nil {
		t.Fatal(err)
	}
	var pkg struct {
		Version string `json:"version"`
	}
	if err := json.Unmarshal(packageJSON, &pkg); err != nil {
		t.Fatal(err)
	}
	if manifest.Version == "" || manifest.Version != pkg.Version || len(manifest.Files) < 100 {
		t.Fatal("incomplete release manifest")
	}
	for _, entry := range manifest.Files {
		data, err := fs.ReadFile(Files(), entry.Path[1:])
		if err != nil {
			t.Fatal(err)
		}
		hash := sha256.Sum256(data)
		if len(data) != entry.Bytes || hex.EncodeToString(hash[:]) != entry.SHA256 {
			t.Fatalf("asset drift: %s", entry.Path)
		}
	}
	if _, err := fs.ReadFile(Files(), "docs/private-design.md"); !errors.Is(err, fs.ErrNotExist) {
		t.Fatal("unknown public path must be absent")
	}
}
