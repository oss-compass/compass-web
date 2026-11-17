const parseFilenameFromDisposition = (value: string | null) => {
  if (!value) return '';
  const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(value);
  if (utf8?.[1]) {
    try {
      return decodeURIComponent(utf8[1]);
    } catch {
      // 回退到普通 filename
    }
  }
  return /filename="?([^";]+)"?/i.exec(value)?.[1] ?? '';
};

/**
 * 下载后端返回的文件响应。
 * 附件名优先使用 Content-Disposition；失败时读取响应体作为错误信息。
 */
export const downloadFileResponse = async (
  response: Response,
  fallbackFilename: string
) => {
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(
      detail.trim() || `导出失败：${response.status} ${response.statusText}`
    );
  }
  const filename =
    parseFilenameFromDisposition(response.headers.get('content-disposition')) ||
    fallbackFilename;
  const href = URL.createObjectURL(await response.blob());
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename.replace(/[\\/:*?"<>|]+/g, '_');
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
};

export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
