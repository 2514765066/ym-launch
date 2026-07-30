// 桌面布局中的节点槽位
export type DesktopSlot = string | null;

// 桌面节点在布局中的位置
export type DesktopNodeLocation = {
  pageIndex: number;
  nodeIndex: number;
};

// 判断槽位中是否包含节点 ID
export const isDesktopNodeId = (slot: DesktopSlot): slot is string => {
  return slot !== null;
};

// 按固定容量拆分数组
export const chunkDesktopItems = <T>(items: T[], pageSize: number) => {
  if (pageSize <= 0 || items.length === 0) {
    return [];
  }

  // 拆分后需要生成的页面数量
  const pageCount = Math.ceil(items.length / pageSize);

  return Array.from({ length: pageCount }, (_, pageIndex) => {
    // 当前页面在原数组中的起始位置
    const startIndex = pageIndex * pageSize;

    return items.slice(startIndex, startIndex + pageSize);
  });
};

// 将非末页节点补齐为空槽页面
export const padDesktopPage = (
  nodeIds: string[],
  pageSize: number,
): DesktopSlot[] => {
  if (pageSize <= 0) {
    return [];
  }

  // 当前页面最多保留的节点 ID
  const pageNodeIds = nodeIds.slice(0, pageSize);

  // 当前页面还需补充的空槽数量
  const emptySlotCount = pageSize - pageNodeIds.length;

  return [
    ...pageNodeIds,
    ...Array.from<DesktopSlot>({ length: emptySlotCount }).fill(null),
  ];
};

// 将一维空槽布局还原为连续节点页面
export const getDesktopPages = (desktop: DesktopSlot[], pageSize: number) => {
  return chunkDesktopItems(desktop, pageSize)
    .map((page) => {
      return page.filter(isDesktopNodeId);
    })
    .filter((page) => {
      return page.length > 0;
    });
};

// 清理重复节点并生成规范的一维空槽布局
export const createDesktopLayout = (pages: string[][], pageSize: number) => {
  if (pageSize <= 0) {
    return [];
  }

  // 已写入布局的节点 ID
  const visitedNodeIds = new Set<string>();

  // 清理重复节点和空页后的页面
  const nonEmptyPages = pages
    .map((page) => {
      return page.filter((nodeId) => {
        if (visitedNodeIds.has(nodeId)) {
          return false;
        }

        visitedNodeIds.add(nodeId);
        return true;
      });
    })
    .filter((page) => {
      return page.length > 0;
    });

  // 每个旧页面按照新容量拆出的页面
  const resizedPages = nonEmptyPages.flatMap((page) => {
    return chunkDesktopItems(page, pageSize);
  });

  return resizedPages.flatMap((page, index) => {
    // 当前页面是否为桌面末页
    const isLastPage = index === resizedPages.length - 1;

    return isLastPage ? page : padDesktopPage(page, pageSize);
  });
};

// 按旧容量保留页面边界并转换为新容量
export const resizeDesktopLayout = (
  desktop: DesktopSlot[],
  oldPageSize: number,
  newPageSize: number,
) => {
  // 调整容量前的节点页面
  const oldPages = getDesktopPages(desktop, oldPageSize);

  return createDesktopLayout(oldPages, newPageSize);
};

// 计算容量变化后原页面对应的首个新页索引
export const getResizedPageIndex = (
  desktop: DesktopSlot[],
  oldPageSize: number,
  newPageSize: number,
  oldPageIndex: number,
) => {
  if (newPageSize <= 0 || oldPageIndex <= 0) {
    return 0;
  }

  // 调整容量前位于选中页之前的页面
  const precedingPages = getDesktopPages(desktop, oldPageSize).slice(
    0,
    oldPageIndex,
  );

  return precedingPages.reduce((pageIndex, page) => {
    return pageIndex + Math.ceil(page.length / newPageSize);
  }, 0);
};

// 将拖拽产生的溢出节点移动到下一页或新页面
export const resolveDraggedPageOverflow = <T>(
  pages: readonly (readonly T[])[],
  maxLength: number,
): T[][] => {
  if (!Number.isInteger(maxLength) || maxLength <= 0) {
    throw new RangeError('maxLength 必须是正整数');
  }

  const workingPages = pages.map((page) => [...page]);
  const result: T[][] = [];

  workingPages.forEach((page, index) => {
    if (page.length <= maxLength) {
      result.push(page);
      return;
    }

    //溢出的部分
    const overflow = page.splice(maxLength);

    //添加没有溢出的部分
    result.push(page);

    //下一页
    const nextPage = workingPages[index + 1];

    //下一页可以放下溢出的部分
    if (nextPage && nextPage.length + overflow.length <= maxLength) {
      workingPages[index + 1] = [...nextPage, ...overflow];
      return;
    }

    //放不下溢出的部分
    for (let start = 0; start < overflow.length; start += maxLength) {
      result.push(overflow.slice(start, start + maxLength));
    }
  });

  return result;
};

// 查找节点在一维空槽布局中的页面位置
export const findDesktopNodeLocation = (
  desktop: DesktopSlot[],
  pageSize: number,
  nodeId: string,
): DesktopNodeLocation | null => {
  if (pageSize <= 0) {
    return null;
  }

  // 节点在一维布局中的槽位索引
  const slotIndex = desktop.indexOf(nodeId);

  if (slotIndex < 0) {
    return null;
  }

  // 节点所在原始槽位页之前的非空页面
  const precedingPages = chunkDesktopItems(desktop, pageSize)
    .slice(0, Math.floor(slotIndex / pageSize))
    .filter((page) => {
      return page.some(isDesktopNodeId);
    });

  // 节点所在原始槽位页内的有效节点
  const currentPage = desktop
    .slice(
      Math.floor(slotIndex / pageSize) * pageSize,
      (Math.floor(slotIndex / pageSize) + 1) * pageSize,
    )
    .filter(isDesktopNodeId);

  return {
    pageIndex: precedingPages.length,
    nodeIndex: currentPage.indexOf(nodeId),
  };
};
