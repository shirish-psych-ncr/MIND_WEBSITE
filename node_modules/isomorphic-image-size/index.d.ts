type SizeResult = {
    width: number;
    height: number;
    type: string;
    mime: string;
    wUnits: string;
    hUnits: string;
}

export default function get_image_size(data: Uint8Array | ArrayBuffer, ext: string): SizeResult | null;
