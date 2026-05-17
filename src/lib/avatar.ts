type AvatarLike =
  | string
  | {
      url?: string | null
      avatar?: { url?: string | null } | string | null
    }
  | null
  | undefined

export function resolveAvatarUrl(
  avatar: AvatarLike,
  fallback: string,
): string {
  if (typeof avatar === 'string') {
    return avatar.trim() || fallback
  }

  if (avatar && typeof avatar === 'object') {
    if (typeof avatar.url === 'string' && avatar.url.trim()) {
      return avatar.url
    }

    if (typeof avatar.avatar === 'string' && avatar.avatar.trim()) {
      return avatar.avatar
    }

    if (
      avatar.avatar &&
      typeof avatar.avatar === 'object' &&
      typeof avatar.avatar.url === 'string' &&
      avatar.avatar.url.trim()
    ) {
      return avatar.avatar.url
    }
  }

  return fallback
}
