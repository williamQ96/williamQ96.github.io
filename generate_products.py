import os
import json
import urllib.parse
from pathlib import Path

# Paths
BASE_DIR = Path('used-shop')
IMAGES_DIR = BASE_DIR / 'assets/images'
PRODUCTS_FILE = BASE_DIR / 'assets/products.json'

# Existing Data (Preserve these)
EXISTING_DATA = {
    "4ft Fluorescent Shop Light Fixture – Hanging or Surface Mount": {"price": 45.00, "category": "Furniture"},
    "Jump Rope with Foam Handles – Black": {"price": 120.00, "category": "Misc"},
    "Large White Ceramic Bowl – Approx. 11–12” Diameter": {"price": 85.00, "category": "Kitchen"}
}

# Category Keywords for auto-tagging
CATEGORY_RULES = [
    ("Bowl", "Kitchen"),
    ("Knife", "Kitchen"),
    ("Cuisinart", "Kitchen"),
    ("SodaStream", "Kitchen"),
    ("Lamp", "Furniture"),
    ("Light", "Furniture"),
    ("Game", "Games"),
    ("PS4", "Games"),
    ("PS3", "Games"),
    ("Tekken", "Games"),
    ("DVD", "Movies"),
    ("Blu-ray", "Movies"),
    ("Series", "Movies"),
    ("Modem", "Electronics"),
    ("Dryer", "Electronics"),
    ("Motherboard", "Electronics"),
    ("iPad", "Electronics"),
    ("Sanding", "Tools"),
    ("Roborock", "Home"),
    ("Thigh Toner", "Sports"),
    ("Jump Rope", "Sports"), # Override Misc if we want, but sticking to existing map for exact match (wait, existing map takes precedence)
]

def get_category(name):
    # Check existing first (handled in main loop, but here for fallback logic if needed)
    for keyword, cat in CATEGORY_RULES:
        if keyword in name:
            return cat
    return "Misc"

def main():
    if not IMAGES_DIR.exists():
        print(f"Error: {IMAGES_DIR} does not exist.")
        return

    # Get all jpg files (case insensitive check could be better but basic glob is likely enough for .jpg)
    # The user list showed .jpg extension.
    files = sorted([f for f in os.listdir(IMAGES_DIR) if f.lower().endswith('.jpg') or f.lower().endswith('.png')])
    
    products = []
    
    for i, filename in enumerate(files):
        # ID: item-001, item-002...
        item_id = f"item-{i+1:03d}"
        
        # Name: filename without extension
        name = os.path.splitext(filename)[0]
        
        # Image Path: URL encoded
        # We need to manually quote the path parts or just the filename
        # 'assets/images/' + encoded_filename
        encoded_filename = urllib.parse.quote(filename)
        image_path = f"assets/images/{encoded_filename}"
        
        # Determine Metadata
        if name in EXISTING_DATA:
            price = EXISTING_DATA[name]["price"]
            category = EXISTING_DATA[name]["category"]
        else:
            price = 0.00
            category = get_category(name)
            
        products.append({
            "id": item_id,
            "name": name,
            "price": price,
            "category": category,
            "image": image_path
        })

    # Write to JSON
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully generated {len(products)} items in {PRODUCTS_FILE}")

if __name__ == "__main__":
    main()
