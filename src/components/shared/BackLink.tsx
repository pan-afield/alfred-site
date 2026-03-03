"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * 返回链接：根据当前路径智能决定返回目标
 *
 * 方案说明：
 * - 方案 A（当前实现）：基于路径层级
 *   /projects/xxx → /projects
 *   /projects → /
 *   简单可预测，适合站内导航
 *
 * - 方案 B：使用 router.back()
 *   符合浏览器返回，但直接打开详情页时可能跳到站外
 *
 * - 方案 C：混合：有 history 则 back()，否则回父级
 *   需检测 referrer 或 history.length（后者不可靠）
 */
function getBackHref(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) {
    return "/"; // 列表页 → 首页
  }
  // 详情页 → 父级列表页
  return "/" + segments.slice(0, -1).join("/");
}

interface BackLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export function BackLink({ className, children }: BackLinkProps) {
  const pathname = usePathname();
  const href = getBackHref(pathname);

  return (
    <Link
      href={href}
      className={className ?? "group flex items-center gap-2 text-main font-medium"}
    >
      {children ?? (
        <>
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Index</span>
        </>
      )}
    </Link>
  );
}

/**
 * 使用 router.back() 的版本（方案 B）
 * 直接打开详情页时，会返回浏览器上一页（可能为空白或站外）
 */
export function BackLinkWithHistory() {
  const router = useRouter();
  const pathname = usePathname();
  const fallbackHref = getBackHref(pathname);

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleClick}
      className="group flex items-center gap-2 text-main font-medium"
    >
      <span className="transition-transform group-hover:-translate-x-1">←</span>
      <span>Index</span>
    </Link>
  );
}
