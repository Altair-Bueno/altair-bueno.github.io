export enum EventType {
  "CommitCommentEvent" = "CommitCommentEvent",
  "CreateEvent" = "CreateEvent",
  "DeleteEvent" = "DeleteEvent",
  "ForkEvent" = "ForkEvent",
  "GollumEvent" = "GollumEvent",
  "IssueCommentEvent" = "IssueCommentEvent",
  "IssuesEvent" = "IssuesEvent",
  "MemberEvent" = "MemberEvent",
  "PublicEvent" = "PublicEvent",
  "PullRequestEvent" = "PullRequestEvent",
  "PullRequestReviewEvent" = "PullRequestReviewEvent",
  "PullRequestReviewCommentEvent" = "PullRequestReviewCommentEvent",
  "PullRequestReviewThreadEvent" = "PullRequestReviewThreadEvent",
  "PushEvent" = "PushEvent",
  "ReleaseEvent" = "ReleaseEvent",
  "SponsorshipEvent" = "SponsorshipEvent",
  "WatchEvent" = "WatchEvent",
}

export interface Actor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

export interface Author {
  email: string;
  name: string;
}

export interface Commit {
  sha: string;
  author: Author;
  message: string;
  distinct: boolean;
  url: string;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface Assignee {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee: Assignee;
  assignees: Assignee[];
  milestone?: any;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  author_association: string;
  active_lock_reason?: any;
  draft: boolean;
  pull_request: PullRequest;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app?: any;
  state_reason: string;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: Date;
  updated_at: Date;
  author_association: string;
  body: string;
  reactions: Reactions;
  performed_via_github_app?: any;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Head {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repo;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface Base {
  label: string;
  ref: string;
  sha: string;
  user: User;
  repo: Repo;
}

export interface LinkHref {
  href: string;
}

export interface Links {
  self: LinkHref;
  html: LinkHref;
  issue: LinkHref;
  comments: LinkHref;
  review_comments: LinkHref;
  review_comment: LinkHref;
  commits: LinkHref;
  statuses: LinkHref;
}

export interface MergedBy {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: User;
  body?: any;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  merged_at?: Date;
  merge_commit_sha: string;
  assignee?: any;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone?: any;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: Head;
  base: Base;
  _links: Links;
  author_association: string;
  auto_merge?: any;
  active_lock_reason?: any;
  merged: boolean;
  mergeable?: any;
  rebaseable?: any;
  mergeable_state: string;
  merged_by: MergedBy;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface Payload {
  push_id: any;
  size: number;
  distinct_size: number;
  ref: string;
  head: string;
  before: string;
  commits: Commit[];
  action: string;
  issue: Issue;
  comment: Comment;
  number?: number;
  pull_request: PullRequest;
}

export interface Org {
  id: number;
  login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

export interface GitHubEvent {
  id: string;
  type: EventType;
  actor: Actor;
  repo: Repo;
  payload: Payload;
  public: boolean;
  created_at: Date;
  org: Org;
}
