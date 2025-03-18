import { Leetcode, Codeforces } from "../interfaces/contests";

export const GetBookmark = () => {
    const bookmarks = localStorage.getItem('contestBookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
};  

export const AddBookmark = (contest: Leetcode | Codeforces) => {
    const bookmarks = GetBookmark();
    const contestKey = JSON.stringify(contest);

    if (!bookmarks.includes(contestKey)) {
        bookmarks.push(contestKey);
            localStorage.setItem('contestBookmarks', JSON.stringify(bookmarks));
        }
    return bookmarks;
};

export const RemoveBookmark = (contest: Leetcode | Codeforces) => {
    const bookmarks = GetBookmark();
    const contestKey = JSON.stringify(contest);

    const updatedBookmarks = bookmarks.filter((bookmark: any) => bookmark !== contestKey);
    localStorage.setItem('contestBookmarks', JSON.stringify(updatedBookmarks));
    return updatedBookmarks;
};

export const IsBookmarked = (contest: Leetcode | Codeforces) => {
    const bookmarks = GetBookmark();
    const contestKey = JSON.stringify(contest);
    return bookmarks.includes(contestKey);
};