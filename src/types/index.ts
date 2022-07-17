export interface Acknowledgment {
  iconName: string;
  author: Subject;
  website: Subject;
}

export interface Subject {
  name: string;
  link: string;
}

export interface Footer {
  foo?: string;
}
export interface Resume {
  title?: string;
  content?: Content;
  links?: Object;
}

export interface Content {
  description: string;
  keypoints: string[];
}
export interface WebsiteSource {
  icon?: string;
  link?: string;
}