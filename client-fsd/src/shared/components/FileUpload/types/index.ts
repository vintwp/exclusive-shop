type FilesGroup = 'image' | 'csv' | 'video';

type TFilesGroup = {
  [key in FilesGroup]: string;
};

const Files: TFilesGroup = {
  image: 'image/*',
  video: 'video/*',
  csv: 'text/csv',
} as const;

export { Files, type FilesGroup };
