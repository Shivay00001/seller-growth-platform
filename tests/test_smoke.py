"""Smoke test: Next.js app layout sane and no build output tracked.

Regression guard: .next/ build output was once committed; it must stay out.
"""
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent.parent


def test_no_next_build_output_tracked():
    r = subprocess.run(["git", "ls-files"], capture_output=True, text=True, cwd=ROOT)
    tracked = r.stdout.splitlines()
    bad = [f for f in tracked if f.startswith(".next/") or f.startswith("next/")]
    assert not bad, f"build output tracked: {bad[:5]}"


def test_app_router_layout():
    assert (ROOT / "app" / "layout.tsx").exists(), "app/layout.tsx missing"
    assert (ROOT / "app" / "page.tsx").exists(), "app/page.tsx missing"
    assert (ROOT / "middleware.ts").exists(), "middleware.ts missing"


def test_next_config_or_package():
    assert (ROOT / "package.json").exists()
    pkg = (ROOT / "package.json").read_text()
    assert '"next"' in pkg, "next not a dependency"
