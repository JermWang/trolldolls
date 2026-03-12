from rembg import remove, new_session
from PIL import Image
import numpy as np
import os
import sys

trolls_dir = r'C:\Users\16303\Desktop\CURSOR\WEB3\Troll Dolls\troll-dolls\public\trolls'

# Only process specific files if passed as args, otherwise process all
only_files = sys.argv[1:] if len(sys.argv) > 1 else None

# Use u2net model
session = new_session('u2net')

for f in sorted(os.listdir(trolls_dir)):
    if not f.endswith('.png'):
        continue
    if only_files and f not in only_files:
        continue
    path = os.path.join(trolls_dir, f)
    print(f'Processing {f}...', flush=True)
    
    # Open image
    img = Image.open(path).convert('RGBA')
    
    # Flatten to RGB on white background first
    # This removes any existing alpha/transparency artifacts
    bg = Image.new('RGB', img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    
    # Run rembg background removal on flattened image
    result = remove(bg, session=session, bgcolor=None, post_process_mask=True)
    
    # Post-process with numpy to clean up edges
    arr = np.array(result)
    
    # Kill pixels with very low alpha (noise)
    arr[arr[:,:,3] < 30] = [0, 0, 0, 0]
    
    # Make high-alpha pixels fully opaque
    mask = arr[:,:,3] > 220
    arr[mask, 3] = 255
    
    # Remove any remaining light gray/white semi-transparent pixels
    # (these are checkerboard remnants)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    is_graywhite = (r > 200) & (g > 200) & (b > 200) & (a < 200) & (a > 0)
    arr[is_graywhite] = [0, 0, 0, 0]
    
    clean = Image.fromarray(arr)
    
    # Trim transparent borders
    bbox = clean.getbbox()
    if bbox:
        clean = clean.crop(bbox)
    
    clean.save(path, 'PNG')
    print(f'  Done: {clean.size[0]}x{clean.size[1]}', flush=True)

print('All images processed!')
