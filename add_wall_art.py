#!/usr/bin/env python3
"""
Wall Art Generator for Interior Renders
========================================
Generates artwork using OpenAI's DALL-E 3 and composites it onto empty walls
in interior render images. Uses perspective transformation for realistic placement.

Usage:
    export OPENAI_API_KEY="sk-..."
    python3 add_wall_art.py
"""

import os
import sys
import io
import time
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from openai import OpenAI
import requests

# ─── Configuration ──────────────────────────────────────────────────────────

BASE_DIR = Path("/Users/moritz/IdeaProjects/Immobilien Projekt/TWIN VILLAS")
OUTPUT_DIR = Path("/Users/moritz/IdeaProjects/Immobilien Projekt/TWIN VILLAS_WITH_ART")

# Wall art style matching the luxury interior aesthetic
ART_STYLES = [
    "elegant large abstract painting with soft gold, cream and warm gray brushstrokes, contemporary luxury art on canvas, minimalist, high-end gallery piece",
    "sophisticated modern abstract art with flowing forms in beige, gold and charcoal, luxury contemporary painting, museum quality",
    "refined abstract expressionist painting with subtle gold leaf accents, warm neutral palette of ivory cream and soft gray, luxury interior art",
    "minimalist contemporary art piece with gentle gold and white textures, abstract landscape impression, elegant luxury style",
    "modern gallery artwork with organic abstract forms in champagne gold, warm white and soft taupe, luxury residential art",
]


def wall_config():
    """Define images and their empty wall regions.

    Each wall is defined by 4 corner points (x%, y%) forming a quadrilateral.
    Points are given clockwise: top-left, top-right, bottom-right, bottom-left.
    Coordinates are percentages (0.0-1.0) of image dimensions.
    """
    return [
        # ─── Attic Livingroom - empty wall behind sofa on the left ───
        {
            "image": "ATTIC RENDER/ATTIC LIVINGROOM/1 (1).png",
            "walls": [{
                "corners_pct": [(0.05, 0.22), (0.26, 0.22), (0.26, 0.52), (0.05, 0.52)],
                "art_prompt": ART_STYLES[0],
                "frame": {"color": (45, 38, 32), "width": 8},
            }],
        },
        # ─── Attic Livingroom - wall beside TV (view 2) ───
        {
            "image": "ATTIC RENDER/ATTIC LIVINGROOM/2.png",
            "walls": [{
                "corners_pct": [(0.02, 0.18), (0.22, 0.18), (0.22, 0.50), (0.02, 0.50)],
                "art_prompt": ART_STYLES[1],
                "frame": {"color": (45, 38, 32), "width": 8},
            }],
        },
        # ─── Basement Livingroom - wall behind dining area ───
        {
            "image": "-1 BASEMENT FLOOR RENDER/-1 BASEMENT FLOOR LIVINGROOM/1 (2).png",
            "walls": [{
                "corners_pct": [(0.03, 0.12), (0.28, 0.12), (0.28, 0.48), (0.03, 0.48)],
                "art_prompt": ART_STYLES[2],
                "frame": {"color": (55, 48, 42), "width": 8},
            }],
        },
        # ─── Basement Livingroom - side wall space (panoramic view) ───
        {
            "image": "-1 BASEMENT FLOOR RENDER/-1 BASEMENT FLOOR LIVINGROOM/1 (5).png",
            "walls": [{
                "corners_pct": [(0.03, 0.15), (0.22, 0.15), (0.22, 0.50), (0.03, 0.50)],
                "art_prompt": ART_STYLES[3],
                "frame": {"color": (50, 45, 40), "width": 7},
            }],
        },
        # ─── Ground Floor Bedroom - left wall above armchair ───
        {
            "image": "GROUND FLOOR RENDER/BEDROOM/2.png",
            "walls": [{
                "corners_pct": [(0.04, 0.15), (0.28, 0.15), (0.28, 0.50), (0.04, 0.50)],
                "art_prompt": ART_STYLES[4],
                "frame": {"color": (40, 35, 30), "width": 8},
            }],
        },
        # ─── Ground Floor Master Bedroom - wall beside bed (left side) ───
        {
            "image": "GROUND FLOOR RENDER/MASTER BEDROOM/1 (1).png",
            "walls": [{
                # Small art piece on the left wall panel
                "corners_pct": [(0.02, 0.25), (0.14, 0.25), (0.14, 0.52), (0.02, 0.52)],
                "art_prompt": ART_STYLES[0],
                "frame": {"color": (50, 45, 38), "width": 6},
            }],
        },
        # ─── Entrance Hall - wall beside door ───
        {
            "image": "-1 BASEMENT FLOOR RENDER/ENTRANCE HALL/1 (1).png",
            "walls": [{
                "corners_pct": [(0.05, 0.18), (0.25, 0.18), (0.25, 0.52), (0.05, 0.52)],
                "art_prompt": ART_STYLES[1],
                "frame": {"color": (55, 48, 40), "width": 6},
            }],
        },
        # ─── Basement Livingroom - view toward kitchen, wall on far left ───
        {
            "image": "-1 BASEMENT FLOOR RENDER/-1 BASEMENT FLOOR LIVINGROOM/1 (3).png",
            "walls": [{
                "corners_pct": [(0.03, 0.18), (0.18, 0.20), (0.18, 0.52), (0.03, 0.50)],
                "art_prompt": ART_STYLES[2],
                "frame": {"color": (48, 42, 36), "width": 7},
            }],
        },
    ]


# ─── Art Generation ─────────────────────────────────────────────────────────

def generate_artwork(client: OpenAI, prompt: str, size: tuple) -> Image.Image:
    """Generate artwork using DALL-E 3."""
    # Determine best DALL-E size
    aspect = size[0] / size[1]
    if aspect > 1.3:
        dalle_size = "1792x1024"
    elif aspect < 0.77:
        dalle_size = "1024x1792"
    else:
        dalle_size = "1024x1024"

    full_prompt = (
        f"{prompt}. "
        "The artwork should be a single painting/art piece shown straight-on, "
        "no frame, no wall background, just the art itself filling the entire image. "
        "High quality, photorealistic render style."
    )

    print(f"    Generating art ({dalle_size})...")
    response = client.images.generate(
        model="dall-e-3",
        prompt=full_prompt,
        size=dalle_size,
        quality="hd",
        n=1,
    )

    image_url = response.data[0].url
    image_data = requests.get(image_url).content
    art = Image.open(io.BytesIO(image_data)).convert("RGBA")

    # Resize to target dimensions
    art = art.resize(size, Image.LANCZOS)
    return art


# ─── Frame Creation ─────────────────────────────────────────────────────────

def add_frame(art: Image.Image, frame_color: tuple, frame_width: int) -> Image.Image:
    """Add a realistic frame around the artwork."""
    w, h = art.size
    fw = frame_width

    # Create framed image (larger to accommodate frame)
    framed_w = w + fw * 2
    framed_h = h + fw * 2
    framed = Image.new("RGBA", (framed_w, framed_h), (0, 0, 0, 0))

    draw = ImageDraw.Draw(framed)

    # Outer frame
    r, g, b = frame_color
    draw.rectangle([0, 0, framed_w - 1, framed_h - 1], fill=(r, g, b, 255))

    # Inner bevel (lighter)
    bevel = max(2, fw // 3)
    lighter = (min(r + 40, 255), min(g + 40, 255), min(b + 40, 255))
    draw.rectangle([bevel, bevel, framed_w - bevel - 1, framed_h - bevel - 1],
                    fill=(lighter[0], lighter[1], lighter[2], 255))

    # Inner edge (darker)
    inner_bevel = max(1, fw // 4)
    darker = (max(r - 20, 0), max(g - 20, 0), max(b - 20, 0))
    draw.rectangle([fw - inner_bevel, fw - inner_bevel,
                     fw + w + inner_bevel - 1, fw + h + inner_bevel - 1],
                    fill=(darker[0], darker[1], darker[2], 255))

    # Paste artwork
    framed.paste(art, (fw, fw))

    return framed


# ─── Shadow Effect ──────────────────────────────────────────────────────────

def add_shadow(framed_art: Image.Image, offset: int = 4, blur: int = 8) -> Image.Image:
    """Add a drop shadow behind the framed artwork for depth."""
    w, h = framed_art.size
    shadow_size = (w + blur * 4, h + blur * 4)

    # Create shadow
    shadow = Image.new("RGBA", shadow_size, (0, 0, 0, 0))
    shadow_rect = Image.new("RGBA", (w, h), (0, 0, 0, 80))
    shadow.paste(shadow_rect, (blur * 2 + offset, blur * 2 + offset))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))

    # Composite framed art over shadow
    shadow.paste(framed_art, (blur * 2, blur * 2), framed_art)

    return shadow


# ─── Perspective Transform ──────────────────────────────────────────────────

def find_perspective_coeffs(src_coords, dst_coords):
    """Calculate perspective transformation coefficients.
    src_coords and dst_coords are lists of 4 (x,y) tuples."""
    import numpy as np
    matrix = []
    for s, d in zip(dst_coords, src_coords):
        matrix.append([d[0], d[1], 1, 0, 0, 0, -s[0]*d[0], -s[0]*d[1]])
        matrix.append([0, 0, 0, d[0], d[1], 1, -s[1]*d[0], -s[1]*d[1]])
    A = np.matrix(matrix, dtype=float)
    B = np.array([c for pair in zip(*[s for s in zip(*[src_coords])]) for c in pair], dtype=float)
    # Flatten source coords
    B = []
    for s in src_coords:
        B.append(s[0])
        B.append(s[1])
    B = np.array(B, dtype=float)

    res = np.linalg.solve(A, B)
    return list(res.flat)


def composite_art_on_wall(
    room_img: Image.Image,
    art_with_shadow: Image.Image,
    corners: list[tuple[float, float]],
) -> Image.Image:
    """Composite the framed artwork onto the wall at the specified corners.

    corners: 4 corner points (x, y) in pixels, clockwise from top-left.
    """
    img_w, img_h = room_img.size
    art_w, art_h = art_with_shadow.size

    # Source corners (art image corners)
    src = [(0, 0), (art_w, 0), (art_w, art_h), (0, art_h)]

    # Destination corners (wall position)
    dst = corners

    # Check if perspective transform is needed (non-rectangular)
    is_rectangular = (
        abs(dst[0][1] - dst[1][1]) < 3 and
        abs(dst[2][1] - dst[3][1]) < 3 and
        abs(dst[0][0] - dst[3][0]) < 3 and
        abs(dst[1][0] - dst[2][0]) < 3
    )

    result = room_img.copy().convert("RGBA")

    if is_rectangular:
        # Simple resize and paste
        target_w = int(dst[1][0] - dst[0][0])
        target_h = int(dst[2][1] - dst[1][1])
        resized = art_with_shadow.resize((target_w, target_h), Image.LANCZOS)
        pos = (int(dst[0][0]), int(dst[0][1]))
        result.paste(resized, pos, resized)
    else:
        # Perspective transform
        try:
            coeffs = find_perspective_coeffs(src, dst)
            transformed = art_with_shadow.transform(
                (img_w, img_h), Image.PERSPECTIVE, coeffs, Image.BICUBIC
            )
            result = Image.alpha_composite(result, transformed)
        except Exception as e:
            print(f"    Warning: Perspective transform failed ({e}), using rectangular placement")
            target_w = int(max(dst[1][0] - dst[0][0], dst[2][0] - dst[3][0]))
            target_h = int(max(dst[3][1] - dst[0][1], dst[2][1] - dst[1][1]))
            resized = art_with_shadow.resize((target_w, target_h), Image.LANCZOS)
            pos = (int(dst[0][0]), int(dst[0][1]))
            result.paste(resized, pos, resized)

    return result.convert("RGB")


# ─── Wall Brightness Matching ───────────────────────────────────────────────

def match_wall_brightness(art: Image.Image, room_img: Image.Image, corners_px: list) -> Image.Image:
    """Adjust artwork brightness to match the wall area lighting."""
    # Sample wall brightness around the art placement area
    x_coords = [c[0] for c in corners_px]
    y_coords = [c[1] for c in corners_px]

    # Sample region slightly outside the art area
    margin = 20
    sample_x1 = max(0, int(min(x_coords)) - margin)
    sample_y1 = max(0, int(min(y_coords)) - margin)
    sample_x2 = min(room_img.width, int(max(x_coords)) + margin)
    sample_y2 = min(room_img.height, int(max(y_coords)) + margin)

    wall_region = room_img.crop((sample_x1, sample_y1, sample_x2, sample_y2))
    wall_gray = wall_region.convert("L")
    wall_brightness = sum(wall_gray.getdata()) / len(list(wall_gray.getdata()))

    # Adjust art brightness to be slightly darker than wall (as paintings tend to be)
    art_gray = art.convert("L")
    art_brightness = sum(art_gray.getdata()) / len(list(art_gray.getdata()))

    if art_brightness > 0:
        target_brightness = wall_brightness * 0.75  # Paintings are usually darker than walls
        factor = target_brightness / art_brightness
        factor = max(0.5, min(1.5, factor))  # Clamp to reasonable range

        enhancer = ImageEnhance.Brightness(art)
        art = enhancer.enhance(factor)

    return art


# ─── Main Processing ────────────────────────────────────────────────────────

def process_image(client: OpenAI, config: dict, art_index: int):
    """Process a single image configuration."""
    image_path = BASE_DIR / config["image"]

    if not image_path.exists():
        print(f"  SKIP: {config['image']} not found")
        return

    print(f"\n{'='*60}")
    print(f"Processing: {config['image']}")
    print(f"{'='*60}")

    room_img = Image.open(image_path).convert("RGBA")
    img_w, img_h = room_img.size
    print(f"  Image size: {img_w}x{img_h}")

    result = room_img

    for i, wall in enumerate(config["walls"]):
        print(f"\n  Wall {i+1}:")

        # Convert percentage corners to pixel coordinates
        corners_pct = wall["corners_pct"]
        corners_px = [(int(x * img_w), int(y * img_h)) for x, y in corners_pct]

        # Calculate art dimensions from corners
        art_w = int(max(corners_px[1][0] - corners_px[0][0], corners_px[2][0] - corners_px[3][0]))
        art_h = int(max(corners_px[3][1] - corners_px[0][1], corners_px[2][1] - corners_px[1][1]))

        frame_cfg = wall.get("frame", {"color": (45, 38, 32), "width": 8})
        frame_w = frame_cfg["width"]

        # Inner art size (excluding frame and shadow padding)
        inner_w = max(100, art_w - frame_w * 2 - 24)  # 24 = shadow padding
        inner_h = max(100, art_h - frame_w * 2 - 24)

        # Generate artwork
        art_style = wall.get("art_prompt", ART_STYLES[art_index % len(ART_STYLES)])
        art = generate_artwork(client, art_style, (inner_w, inner_h))

        # Match wall brightness
        art = match_wall_brightness(art, room_img.convert("RGB"), corners_px)

        # Add frame
        framed = add_frame(art, frame_cfg["color"], frame_w)
        print(f"    Framed size: {framed.size}")

        # Add shadow
        art_with_shadow = add_shadow(framed, offset=3, blur=6)
        print(f"    With shadow: {art_with_shadow.size}")

        # Composite onto wall
        result = composite_art_on_wall(result.convert("RGBA"), art_with_shadow, corners_px)
        print(f"    Composited onto wall")

        # Rate limit: DALL-E 3 has limits
        time.sleep(1)

    # Save result
    rel_path = Path(config["image"])
    output_path = OUTPUT_DIR / rel_path.parent / f"{rel_path.stem}_with_art{rel_path.suffix}"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    result_rgb = result.convert("RGB") if result.mode == "RGBA" else result
    result_rgb.save(output_path, quality=95)
    print(f"\n  SAVED: {output_path}")


def main():
    # Check API key
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: Set OPENAI_API_KEY environment variable first!")
        print("  export OPENAI_API_KEY='sk-...'")
        sys.exit(1)

    client = OpenAI(api_key=api_key)

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    configs = wall_config()

    print(f"Wall Art Generator")
    print(f"==================")
    print(f"Found {len(configs)} images to process")
    print(f"Output: {OUTPUT_DIR}")

    for idx, config in enumerate(configs):
        try:
            process_image(client, config, idx)
        except Exception as e:
            print(f"\n  ERROR processing {config['image']}: {e}")
            import traceback
            traceback.print_exc()

    print(f"\n{'='*60}")
    print(f"Done! Check results in: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
