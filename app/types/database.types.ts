// types/database.types.ts
/* eslint-disable */
/**
 * AUTO-GENERATED: Database typings for Nuxt + Supabase
 * Schemas included: public, auth, storage, realtime, vault
 *
 * Insert types make nullable columns optional.
 * Update types make all columns optional.
 *
 * Adjust as needed.
 */

/* ---------- shared utility types ---------- */
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type Nullable<T> = T | null;

/* ---------- public schema ---------- */
export namespace Public {
  export interface AlbumsRow {
    created_at: string; // timestamptz
    created_by: Nullable<string>; // uuid
    spotify_info: Nullable<Json>;
    bpm: Nullable<string>;
    type: Nullable<string>;
    album_id: Nullable<string>;
    id: string;
    name: Nullable<string>;
    album_name: Nullable<string>;
    artist: Nullable<string>;
  }
  export interface AlbumsInsert {
    created_at?: string;
    created_by?: string;
    spotify_info?: Json;
    bpm?: string;
    type?: string;
    album_id?: string;
    id: string;
    name?: string;
    album_name?: string;
    artist?: string;
  }
  export interface AlbumsUpdate {
    created_at?: string;
    created_by?: string;
    spotify_info?: Json;
    bpm?: string;
    type?: string;
    album_id?: string;
    id?: string;
    name?: string;
    album_name?: string;
    artist?: string;
  }

  export interface ArticlesRow {
    id: number; // int8
    created_at: string;
    title: Nullable<string>;
    description: Nullable<string>;
    tags: Nullable<string[]>;
    image: Nullable<string>;
    added_by: Nullable<string>;
    author_image: Nullable<string>;
    link: Nullable<string>;
    author: Nullable<string>;
  }
  export interface ArticlesInsert {
    id?: number;
    created_at?: string;
    title?: string;
    description?: string;
    tags?: string[];
    image?: string;
    added_by?: string;
    author_image?: string;
    link?: string;
    author?: string;
  }
  export interface ArticlesUpdate {
    id?: number;
    created_at?: string;
    title?: string;
    description?: string;
    tags?: string[];
    image?: string;
    added_by?: string;
    author_image?: string;
    link?: string;
    author?: string;
  }

  export interface Artist_videosRow {
    id: string; // uuid
    created_at: string;
    url: Nullable<string>;
    artist_id: string; // uuid
  }
  export interface Artist_videosInsert {
    id?: string;
    created_at?: string;
    url?: string;
    artist_id: string;
  }
  export interface Artist_videosUpdate {
    id?: string;
    created_at?: string;
    url?: string;
    artist_id?: string;
  }

  export interface ArtistsRow {
    id: number;
    created_at: string;
    name: Nullable<string>;
    image: Nullable<string>;
    author: Nullable<string>;
    author_image: Nullable<string>;
  }
  export interface ArtistsInsert {
    id?: number;
    created_at?: string;
    name?: string;
    image?: string;
    author?: string;
    author_image?: string;
  }
  export interface ArtistsUpdate {
    id?: number;
    created_at?: string;
    name?: string;
    image?: string;
    author?: string;
    author_image?: string;
  }

  export interface Class_attendanceRow {
    created_at: string;
    name: Nullable<string>;
    donation: Nullable<number>;
    donation_type: Nullable<string>;
    date: Nullable<string>;
    id: string; // uuid
  }
  export interface Class_attendanceInsert {
    created_at?: string;
    name?: string;
    donation?: number;
    donation_type?: string;
    date?: string;
    id?: string;
  }
  export interface Class_attendanceUpdate {
    created_at?: string;
    name?: string;
    donation?: number;
    donation_type?: string;
    date?: string;
    id?: string;
  }

  export interface ClassesRow {
    id: string; // uuid
    created_at: string;
    attendees: Nullable<number>;
    taking_cash: Nullable<number>;
    taking_card: Nullable<number>;
    date: string;
    class_theme: Nullable<string>;
    teachers: Nullable<string[]>;
    rent: Nullable<number>;
  }
  export interface ClassesInsert {
    id?: string;
    created_at?: string;
    attendees?: number;
    taking_cash?: number;
    taking_card?: number;
    date: string;
    class_theme?: string;
    teachers?: string[];
    rent?: number;
  }
  export interface ClassesUpdate {
    id?: string;
    created_at?: string;
    attendees?: number;
    taking_cash?: number;
    taking_card?: number;
    date?: string;
    class_theme?: string;
    teachers?: string[];
    rent?: number;
  }

  export interface CommentsRow {
    created_at: string;
    email: Nullable<string>;
    payload: Nullable<string>;
    post_id: Nullable<string>;
    published: Nullable<boolean>;
    likes: Nullable<number>;
    id: string;
    liked: Nullable<boolean>;
    content: Nullable<string>;
    user_id: Nullable<string>;
  }
  export interface CommentsInsert {
    created_at?: string;
    email?: string;
    payload?: string;
    post_id?: string;
    published?: boolean;
    likes?: number;
    id?: string;
    liked?: boolean;
    content?: string;
    user_id?: string;
  }
  export interface CommentsUpdate {
    created_at?: string;
    email?: string;
    payload?: string;
    post_id?: string;
    published?: boolean;
    likes?: number;
    id?: string;
    liked?: boolean;
    content?: string;
    user_id?: string;
  }

  export interface CoursesRow {
    created_at: string;
    title: Nullable<string>;
    description: Nullable<string>;
    author: Nullable<string>; // uuid
    tags: Nullable<string[]>;
    image: Nullable<string>;
    id: string; // uuid
    image_public_url: Nullable<string>;
    published: Nullable<boolean>;
    updated_at: Nullable<string>; // date (kept as string)
  }
  export interface CoursesInsert {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    image?: string;
    id?: string;
    image_public_url?: string;
    published?: boolean;
    updated_at?: string;
  }
  export interface CoursesUpdate {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    image?: string;
    id?: string;
    image_public_url?: string;
    published?: boolean;
    updated_at?: string;
  }

  export interface DancersRow {
    created_at: string;
    name: Nullable<string>;
    image: Nullable<string>;
    author_id: Nullable<string>;
    playlist_id: Nullable<string>;
    blurb: Nullable<string>;
    styles: Nullable<Json[]>;
    published: Nullable<boolean>;
    id: string;
    birth_year: Nullable<string>;
    death_year: Nullable<string>;
    info: Nullable<Json>;
    gender: Nullable<string>;
    links: Nullable<Json[]>;
    content: Nullable<string>;
    tags: Nullable<string[]>;
    is_dj: Nullable<boolean>;
  }
  export interface DancersInsert {
    created_at?: string;
    name?: string;
    image?: string;
    author_id?: string;
    playlist_id?: string;
    blurb?: string;
    styles?: Json[];
    published?: boolean;
    id?: string;
    birth_year?: string;
    death_year?: string;
    info?: Json;
    gender?: string;
    links?: Json[];
    content?: string;
    tags?: string[];
    is_dj?: boolean;
  }
  export interface DancersUpdate {
    created_at?: string;
    name?: string;
    image?: string;
    author_id?: string;
    playlist_id?: string;
    blurb?: string;
    styles?: Json[];
    published?: boolean;
    id?: string;
    birth_year?: string;
    death_year?: string;
    info?: Json;
    gender?: string;
    links?: Json[];
    content?: string;
    tags?: string[];
    is_dj?: boolean;
  }

  export interface DatesRow {
    id: string;
    created_at: string;
    date: Nullable<string>;
    title: Nullable<string>;
    repeats_yearly: Nullable<boolean>;
    description: Nullable<string>;
  }
  export interface DatesInsert {
    id?: string;
    created_at?: string;
    date?: string;
    title?: string;
    repeats_yearly?: boolean;
    description?: string;
  }
  export interface DatesUpdate {
    id?: string;
    created_at?: string;
    date?: string;
    title?: string;
    repeats_yearly?: boolean;
    description?: string;
  }

  export interface DocumentariesRow {
    id: string;
    created_at: string;
    title: string;
    link: string;
    added_by: Nullable<string>;
    description: string;
    image: string;
    released: Nullable<string>;
  }
  export interface DocumentariesInsert {
    id?: string;
    created_at?: string;
    title?: string;
    link?: string;
    added_by?: string;
    description?: string;
    image?: string;
    released?: string;
  }
  export interface DocumentariesUpdate {
    id?: string;
    created_at?: string;
    title?: string;
    link?: string;
    added_by?: string;
    description?: string;
    image?: string;
    released?: string;
  }

  export interface Dtjj_registrationsRow {
    id: string;
    created_at: string;
    first_name: Nullable<string>;
    last_name: Nullable<string>;
    location: Nullable<string>;
    email: string;
  }
  export interface Dtjj_registrationsInsert {
    id?: string;
    created_at?: string;
    first_name?: string;
    last_name?: string;
    location?: string;
    email: string;
  }
  export interface Dtjj_registrationsUpdate {
    id?: string;
    created_at?: string;
    first_name?: string;
    last_name?: string;
    location?: string;
    email?: string;
  }

  export interface ExpensesRow {
    id: string;
    created_at: string;
    amount: Nullable<number>;
    date: string;
    user_id: Nullable<string>;
    type: Nullable<string>;
    approved: Nullable<boolean>;
    name: Nullable<string>;
    created_by: Nullable<string>;
  }
  export interface ExpensesInsert {
    id?: string;
    created_at?: string;
    amount?: number;
    date?: string;
    user_id?: string;
    type?: string;
    approved?: boolean;
    name?: string;
    created_by?: string;
  }
  export interface ExpensesUpdate {
    id?: string;
    created_at?: string;
    amount?: number;
    date?: string;
    user_id?: string;
    type?: string;
    approved?: boolean;
    name?: string;
    created_by?: string;
  }

  export interface FavouritesRow {
    favourite_id: string;
    user_id: string;
    post_id: string;
    name: Nullable<string>;
    type: Nullable<string>;
  }
  export interface FavouritesInsert {
    favourite_id: string;
    user_id?: string;
    post_id?: string;
    name?: string;
    type?: string;
  }
  export interface FavouritesUpdate {
    favourite_id?: string;
    user_id?: string;
    post_id?: string;
    name?: string;
    type?: string;
  }

  export interface FeedbackRow {
    id: string;
    created_at: string;
    user_id: Nullable<string>;
    type: Nullable<string>;
    feedback: Nullable<string>;
    title: Nullable<string>;
    status: Nullable<string>;
    priority: Nullable<string>;
  }
  export interface FeedbackInsert {
    id?: string;
    created_at?: string;
    user_id?: string;
    type?: string;
    feedback?: string;
    title?: string;
    status?: string;
    priority?: string;
  }
  export interface FeedbackUpdate {
    id?: string;
    created_at?: string;
    user_id?: string;
    type?: string;
    feedback?: string;
    title?: string;
    status?: string;
    priority?: string;
  }

  export interface InspirationRow {
    created_at: string;
    title: Nullable<string>;
    description: Nullable<string>;
    author: Nullable<string>;
    tags: Nullable<string[]>;
    id: string;
    link: Nullable<string>;
    ig_handle: Nullable<string>;
  }
  export interface InspirationInsert {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    id?: string;
    link?: string;
    ig_handle?: string;
  }
  export interface InspirationUpdate {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    id?: string;
    link?: string;
    ig_handle?: string;
  }

  export interface Lesson_completionsRow {
    id: string;
    completed_at: string;
    user_id: Nullable<string>;
    lesson_id: Nullable<string>;
    done: Nullable<boolean>;
  }
  export interface Lesson_completionsInsert {
    id?: string;
    completed_at?: string;
    user_id?: string;
    lesson_id?: string;
    done?: boolean;
  }
  export interface Lesson_completionsUpdate {
    id?: string;
    completed_at?: string;
    user_id?: string;
    lesson_id?: string;
    done?: boolean;
  }

  export interface LessonsRow {
    created_at: string;
    title: Nullable<string>;
    description: Nullable<string>;
    author: Nullable<string>;
    tags: Nullable<string[]>;
    id: string;
    course_id: Nullable<string>;
    link: Nullable<string>;
    updated_at: Nullable<string>;
  }
  export interface LessonsInsert {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    id?: string;
    course_id?: string;
    link?: string;
    updated_at?: string;
  }
  export interface LessonsUpdate {
    created_at?: string;
    title?: string;
    description?: string;
    author?: string;
    tags?: string[];
    id?: string;
    course_id?: string;
    link?: string;
    updated_at?: string;
  }

  export interface LikesRow {
    id: string;
    user_id: Nullable<string>;
    post_id: Nullable<string>;
  }
  export interface LikesInsert {
    id: string;
    user_id?: string;
    post_id?: string;
  }
  export interface LikesUpdate {
    id?: string;
    user_id?: string;
    post_id?: string;
  }

  export interface MovesRow {
    id: number;
    created_at: string;
    name: Nullable<string>;
    description: Nullable<string>;
    tags: Nullable<string[]>;
    image: Nullable<string>;
    author: Nullable<string>;
    author_image: Nullable<string>;
    video_link: Nullable<string>;
  }
  export interface MovesInsert {
    id?: number;
    created_at?: string;
    name?: string;
    description?: string;
    tags?: string[];
    image?: string;
    author?: string;
    author_image?: string;
    video_link?: string;
  }
  export interface MovesUpdate {
    id?: number;
    created_at?: string;
    name?: string;
    description?: string;
    tags?: string[];
    image?: string;
    author?: string;
    author_image?: string;
    video_link?: string;
  }

  export interface Movie_clipsRow {
    id: string;
    created_at: string;
    title: Nullable<string>;
    link: Nullable<string>;
    added_by: Nullable<string>;
    description: Nullable<string>;
    image: Nullable<string>;
    released: Nullable<string>;
    dancers: Nullable<string[]>;
  }
  export interface Movie_clipsInsert {
    id?: string;
    created_at?: string;
    title?: string;
    link?: string;
    added_by?: string;
    description?: string;
    image?: string;
    released?: string;
    dancers?: string[];
  }
  export interface Movie_clipsUpdate {
    id?: string;
    created_at?: string;
    title?: string;
    link?: string;
    added_by?: string;
    description?: string;
    image?: string;
    released?: string;
    dancers?: string[];
  }

  export interface MusiciansRow {
    name: Nullable<string>;
    idOld: Nullable<string>;
    wiki_data: Nullable<Json>;
    spotify_id: Nullable<string>;
    images: Nullable<Json[]>;
    featured_image: Nullable<string>;
    gender: Nullable<string>;
    description: Nullable<string>;
    tags: string[];
    artist_type: Nullable<string>;
    id: string;
    birth_date: Nullable<string>;
  }
  export interface MusiciansInsert {
    name?: string;
    idOld?: string;
    wiki_data?: Json;
    spotify_id?: string;
    images?: Json[];
    featured_image?: string;
    gender?: string;
    description?: string;
    tags?: string[];
    artist_type?: string;
    id?: string;
    birth_date?: string;
  }
  export interface MusiciansUpdate {
    name?: string;
    idOld?: string;
    wiki_data?: Json;
    spotify_id?: string;
    images?: Json[];
    featured_image?: string;
    gender?: string;
    description?: string;
    tags?: string[];
    artist_type?: string;
    id?: string;
    birth_date?: string;
  }

  export interface PlaylistsRow {
    id: string;
    created_at: string;
    date: Nullable<string>;
    image: Nullable<string>;
    songs: Nullable<Json[]>;
    email: Nullable<string>;
    title: Nullable<string>;
    user_id: Nullable<string>;
  }
  export interface PlaylistsInsert {
    id?: string;
    created_at?: string;
    date?: string;
    image?: string;
    songs?: Json[];
    email?: string;
    title?: string;
    user_id?: string;
  }
  export interface PlaylistsUpdate {
    id?: string;
    created_at?: string;
    date?: string;
    image?: string;
    songs?: Json[];
    email?: string;
    title?: string;
    user_id?: string;
  }

  export interface Post_commentsRow {
    id: string;
    content: Nullable<string>;
    created_at: string;
    user_id: string;
    photos: Json;
    parent: Nullable<string>;
  }
  export interface Post_commentsInsert {
    id?: string;
    content?: string;
    created_at?: string;
    user_id?: string;
    photos?: Json;
    parent?: string;
  }
  export interface Post_commentsUpdate {
    id?: string;
    content?: string;
    created_at?: string;
    user_id?: string;
    photos?: Json;
    parent?: string;
  }

  export interface PostsRow {
    id: string;
    content: Nullable<string>;
    created_at: string;
    user_id: Nullable<string>;
    photos: Json;
    parent: Nullable<string>;
  }
  export interface PostsInsert {
    id?: string;
    content?: string;
    created_at?: string;
    user_id?: string;
    photos?: Json;
    parent?: string;
  }
  export interface PostsUpdate {
    id?: string;
    content?: string;
    created_at?: string;
    user_id?: string;
    photos?: Json;
    parent?: string;
  }

  export interface ProfilesRow {
    id: string;
    updated_at: Nullable<string>;
    avatar_url: Nullable<string>;
    first_name: Nullable<string>;
    last_name: Nullable<string>;
    email: Nullable<string>;
    created_at: Nullable<string>;
    role: string;
    is_admin: Nullable<boolean>;
    country: Nullable<string>;
    city: Nullable<string>;
    dob: Nullable<string>;
    phone: Nullable<string>;
    address: Nullable<string>;
    user_role: Nullable<string>;
  }
  export interface ProfilesInsert {
    id: string;
    updated_at?: string;
    avatar_url?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: string;
    role?: string;
    is_admin?: boolean;
    country?: string;
    city?: string;
    dob?: string;
    phone?: string;
    address?: string;
    user_role?: string;
  }
  export interface ProfilesUpdate {
    id?: string;
    updated_at?: string;
    avatar_url?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: string;
    role?: string;
    is_admin?: boolean;
    country?: string;
    city?: string;
    dob?: string;
    phone?: string;
    address?: string;
    user_role?: string;
  }

  export interface SocialsRow {
    id: string;
    created_at: string;
    attendees: Nullable<number>;
    taking_cash: Nullable<number>;
    taking_card: Nullable<number>;
    date: string;
    rent: Nullable<number>;
    fees: Nullable<number>;
    average_sale: Nullable<number>;
    rating: Nullable<number>;
    year: Nullable<string>;
    dj: Nullable<string>;
  }
  export interface SocialsInsert {
    id?: string;
    created_at?: string;
    attendees?: number;
    taking_cash?: number;
    taking_card?: number;
    date: string;
    rent?: number;
    fees?: number;
    average_sale?: number;
    rating?: number;
    year?: string;
    dj?: string;
  }
  export interface SocialsUpdate {
    id?: string;
    created_at?: string;
    attendees?: number;
    taking_cash?: number;
    taking_card?: number;
    date?: string;
    rent?: number;
    fees?: number;
    average_sale?: number;
    rating?: number;
    year?: string;
    dj?: string;
  }

  export interface SongsRow {
    idOld: number;
    created_at: string;
    title: Nullable<string>;
    artist: Nullable<string>;
    album: Nullable<string>;
    duration: Nullable<string>;
    bpm: Nullable<string>;
    preview_url: Nullable<string>;
    deezer_id: Nullable<string>;
    unique_key_string: string;
    id: string;
    genre: Nullable<string>;
  }
  export interface SongsInsert {
    idOld?: number;
    created_at?: string;
    title?: string;
    artist?: string;
    album?: string;
    duration?: string;
    bpm?: string;
    preview_url?: string;
    deezer_id?: string;
    unique_key_string: string;
    id?: string;
    genre?: string;
  }
  export interface SongsUpdate {
    idOld?: number;
    created_at?: string;
    title?: string;
    artist?: string;
    album?: string;
    duration?: string;
    bpm?: string;
    preview_url?: string;
    deezer_id?: string;
    unique_key_string?: string;
    id?: string;
    genre?: string;
  }

  export interface StrollsRow {
    id: number;
    created_at: string;
    title: Nullable<string>;
    description: Nullable<string>;
    video_link: Nullable<string>;
    dancers: Nullable<string[]>;
    image: Nullable<string>;
    email: Nullable<string>;
    tags: Nullable<string[]>;
    year: Nullable<string>;
  }
  export interface StrollsInsert {
    id?: number;
    created_at?: string;
    title?: string;
    description?: string;
    video_link?: string;
    dancers?: string[];
    image?: string;
    email?: string;
    tags?: string[];
    year?: string;
  }
  export interface StrollsUpdate {
    id?: number;
    created_at?: string;
    title?: string;
    description?: string;
    video_link?: string;
    dancers?: string[];
    image?: string;
    email?: string;
    tags?: string[];
    year?: string;
  }

  export interface TracksRow {
    created_at: string;
    created_by: Nullable<string>;
    spotify_info: Nullable<Json>;
    bpm: Nullable<string>;
    type: Nullable<string>;
    album_id: Nullable<string>;
    id: string;
    name: Nullable<string>;
    album_name: Nullable<string>;
    artist: Nullable<string>;
    duration: Nullable<number>;
  }
  export interface TracksInsert {
    created_at?: string;
    created_by?: string;
    spotify_info?: Json;
    bpm?: string;
    type?: string;
    album_id?: string;
    id: string;
    name?: string;
    album_name?: string;
    artist?: string;
    duration?: number;
  }
  export interface TracksUpdate {
    created_at?: string;
    created_by?: string;
    spotify_info?: Json;
    bpm?: string;
    type?: string;
    album_id?: string;
    id?: string;
    name?: string;
    album_name?: string;
    artist?: string;
    duration?: number;
  }

  export interface VideosRow {
    created_at: string;
    created_by: Nullable<string>;
    url: string;
    id: string;
    user_id: Nullable<string>;
    start: Nullable<string>;
    end: Nullable<string>;
    tags: string[];
    notes: Nullable<string>;
    artist_id: Nullable<string>;
    views: Nullable<number>;
    title: Nullable<string>;
    thumbnails: Nullable<Json>;
  }
  export interface VideosInsert {
    created_at?: string;
    created_by?: string;
    url: string;
    id?: string;
    user_id?: string;
    start?: string;
    end?: string;
    tags?: string[];
    notes?: string;
    artist_id?: string;
    views?: number;
    title?: string;
    thumbnails?: Json;
  }
  export interface VideosUpdate {
    created_at?: string;
    created_by?: string;
    url?: string;
    id?: string;
    user_id?: string;
    start?: string;
    end?: string;
    tags?: string[];
    notes?: string;
    artist_id?: string;
    views?: number;
    title?: string;
    thumbnails?: Json;
  }

  // Add additional public tables here as needed...
}

/* ---------- auth schema ---------- */
export namespace Auth {
  export interface Audit_log_entriesRow {
    instance_id: Nullable<string>;
    id: string;
    payload: Nullable<Json>;
    created_at: Nullable<string>;
    ip_address: string;
  }
  export interface Audit_log_entriesInsert {
    instance_id?: string;
    id?: string;
    payload?: Json;
    created_at?: string;
    ip_address?: string;
  }
  export interface Audit_log_entriesUpdate {
    instance_id?: string;
    id?: string;
    payload?: Json;
    created_at?: string;
    ip_address?: string;
  }

  export interface Flow_stateRow {
    id: string;
    user_id: Nullable<string>;
    auth_code: string;
    code_challenge_method: string;
    code_challenge: string;
    provider_type: string;
    provider_access_token: Nullable<string>;
    provider_refresh_token: Nullable<string>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
    authentication_method: string;
    auth_code_issued_at: Nullable<string>;
  }
  export interface Flow_stateInsert {
    id?: string;
    user_id?: string;
    auth_code?: string;
    code_challenge_method?: string;
    code_challenge?: string;
    provider_type?: string;
    provider_access_token?: string;
    provider_refresh_token?: string;
    created_at?: string;
    updated_at?: string;
    authentication_method?: string;
    auth_code_issued_at?: string;
  }
  export interface Flow_stateUpdate {
    id?: string;
    user_id?: string;
    auth_code?: string;
    code_challenge_method?: string;
    code_challenge?: string;
    provider_type?: string;
    provider_access_token?: string;
    provider_refresh_token?: string;
    created_at?: string;
    updated_at?: string;
    authentication_method?: string;
    auth_code_issued_at?: string;
  }

  export interface IdentitiesRow {
    provider_id: string;
    user_id: string;
    identity_data: Json;
    provider: string;
    last_sign_in_at: Nullable<string>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
    email: Nullable<string>;
    id: string;
  }
  export interface IdentitiesInsert {
    provider_id?: string;
    user_id?: string;
    identity_data?: Json;
    provider?: string;
    last_sign_in_at?: string;
    created_at?: string;
    updated_at?: string;
    email?: string;
    id?: string;
  }
  export interface IdentitiesUpdate {
    provider_id?: string;
    user_id?: string;
    identity_data?: Json;
    provider?: string;
    last_sign_in_at?: string;
    created_at?: string;
    updated_at?: string;
    email?: string;
    id?: string;
  }

  export interface InstancesRow {
    id: string;
    uuid: Nullable<string>;
    raw_base_config: Nullable<string>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
  }
  export interface InstancesInsert {
    id?: string;
    uuid?: string;
    raw_base_config?: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface InstancesUpdate {
    id?: string;
    uuid?: string;
    raw_base_config?: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface Mfa_amr_claimsRow {
    session_id: string;
    created_at: string;
    updated_at: string;
    authentication_method: string;
    id: string;
  }
  export interface Mfa_amr_claimsInsert {
    session_id?: string;
    created_at?: string;
    updated_at?: string;
    authentication_method?: string;
    id?: string;
  }
  export interface Mfa_amr_claimsUpdate {
    session_id?: string;
    created_at?: string;
    updated_at?: string;
    authentication_method?: string;
    id?: string;
  }

  export interface Mfa_challengesRow {
    id: string;
    factor_id: string;
    created_at: string;
    verified_at: Nullable<string>;
    ip_address: string;
    otp_code: Nullable<string>;
    web_authn_session_data: Nullable<Json>;
  }
  export interface Mfa_challengesInsert {
    id?: string;
    factor_id?: string;
    created_at?: string;
    verified_at?: string;
    ip_address?: string;
    otp_code?: string;
    web_authn_session_data?: Json;
  }
  export interface Mfa_challengesUpdate {
    id?: string;
    factor_id?: string;
    created_at?: string;
    verified_at?: string;
    ip_address?: string;
    otp_code?: string;
    web_authn_session_data?: Json;
  }

  export interface Mfa_factorsRow {
    id: string;
    user_id: string;
    friendly_name: Nullable<string>;
    factor_type: string;
    status: string;
    created_at: string;
    updated_at: string;
    secret: Nullable<string>;
    phone: Nullable<string>;
    last_challenged_at: Nullable<string>;
    web_authn_credential: Nullable<Json>;
    web_authn_aaguid: Nullable<string>;
    last_webauthn_challenge_data: Nullable<Json>;
  }
  export interface Mfa_factorsInsert {
    id?: string;
    user_id?: string;
    friendly_name?: string;
    factor_type?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
    secret?: string;
    phone?: string;
    last_challenged_at?: string;
    web_authn_credential?: Json;
    web_authn_aaguid?: string;
    last_webauthn_challenge_data?: Json;
  }
  export interface Mfa_factorsUpdate {
    id?: string;
    user_id?: string;
    friendly_name?: string;
    factor_type?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
    secret?: string;
    phone?: string;
    last_challenged_at?: string;
    web_authn_credential?: Json;
    web_authn_aaguid?: string;
    last_webauthn_challenge_data?: Json;
  }

  export interface Oauth_clientsRow {
    id: string;
    client_secret_hash: Nullable<string>;
    registration_type: string;
    redirect_uris: string;
    grant_types: string;
    client_name: Nullable<string>;
    client_uri: Nullable<string>;
    logo_uri: Nullable<string>;
    created_at: string;
    updated_at: string;
    deleted_at: Nullable<string>;
    client_type: string;
  }
  export interface Oauth_clientsInsert {
    id?: string;
    client_secret_hash?: string;
    registration_type?: string;
    redirect_uris?: string;
    grant_types?: string;
    client_name?: string;
    client_uri?: string;
    logo_uri?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    client_type?: string;
  }
  export interface Oauth_clientsUpdate {
    id?: string;
    client_secret_hash?: string;
    registration_type?: string;
    redirect_uris?: string;
    grant_types?: string;
    client_name?: string;
    client_uri?: string;
    logo_uri?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    client_type?: string;
  }

  export interface One_time_tokensRow {
    id: string;
    user_id: string;
    token_type: string;
    token_hash: string;
    relates_to: string;
    created_at: string;
    updated_at: string;
  }
  export interface One_time_tokensInsert {
    id?: string;
    user_id?: string;
    token_type?: string;
    token_hash?: string;
    relates_to?: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface One_time_tokensUpdate {
    id?: string;
    user_id?: string;
    token_type?: string;
    token_hash?: string;
    relates_to?: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface Refresh_tokensRow {
    instance_id: Nullable<string>;
    id: number;
    token: Nullable<string>;
    user_id: Nullable<string>;
    revoked: Nullable<boolean>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
    parent: Nullable<string>;
    session_id: Nullable<string>;
  }
  export interface Refresh_tokensInsert {
    instance_id?: string;
    id?: number;
    token?: string;
    user_id?: string;
    revoked?: boolean;
    created_at?: string;
    updated_at?: string;
    parent?: string;
    session_id?: string;
  }
  export interface Refresh_tokensUpdate {
    instance_id?: string;
    id?: number;
    token?: string;
    user_id?: string;
    revoked?: boolean;
    created_at?: string;
    updated_at?: string;
    parent?: string;
    session_id?: string;
  }

  export interface Saml_providersRow {
    id: string;
    sso_provider_id: string;
    entity_id: string;
    metadata_xml: string;
    metadata_url: Nullable<string>;
    attribute_mapping: Nullable<Json>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
    name_id_format: Nullable<string>;
  }
  export interface Saml_providersInsert {
    id?: string;
    sso_provider_id?: string;
    entity_id?: string;
    metadata_xml?: string;
    metadata_url?: string;
    attribute_mapping?: Json;
    created_at?: string;
    updated_at?: string;
    name_id_format?: string;
  }
  export interface Saml_providersUpdate {
    id?: string;
    sso_provider_id?: string;
    entity_id?: string;
    metadata_xml?: string;
    metadata_url?: string;
    attribute_mapping?: Json;
    created_at?: string;
    updated_at?: string;
    name_id_format?: string;
  }

  export interface Saml_relay_statesRow {
    id: string;
    sso_provider_id: string;
    request_id: string;
    for_email: Nullable<string>;
    redirect_to: Nullable<string>;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
    flow_state_id: Nullable<string>;
  }
  export interface Saml_relay_statesInsert {
    id?: string;
    sso_provider_id?: string;
    request_id?: string;
    for_email?: string;
    redirect_to?: string;
    created_at?: string;
    updated_at?: string;
    flow_state_id?: string;
  }
  export interface Saml_relay_statesUpdate {
    id?: string;
    sso_provider_id?: string;
    request_id?: string;
    for_email?: string;
    redirect_to?: string;
    created_at?: string;
    updated_at?: string;
    flow_state_id?: string;
  }

  export interface Schema_migrationsRow {
    version: string;
  }
  export interface Schema_migrationsInsert {
    version: string;
  }
  export interface Schema_migrationsUpdate {
    version?: string;
  }

  export interface SessionsRow {
    id: string;
    user_id: string;
    created_at: Nullable<string>;
    updated_at: Nullable<string>;
  }

  export interface DtjjPagesRow {
    id: string; // uuid
    slug: string; // text (unique)
    content: Nullable<string>; // text
    created_at: string; // timestamptz
    updated_at: Nullable<string>; // timestamptz
  }
  export interface DtjjPagesInsert {
    id?: string;
    slug: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface DtjjPagesUpdate {
    id?: string;
    slug?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
  }
