export function getUIDFromTags(tags: string[], prefix: string): string | null {
    const tagWithUID = tags.find((tag) => tag.startsWith(prefix));
    return tagWithUID ? tagWithUID.split(':')[1] : null;
}
