import { GetAuthorOutputPort } from "../../../Core/Author/usecases/GetAuthor";

export default class GetAuthorPresenter implements GetAuthorOutputPort{
  present(input: Omit<{ id: string; } & { name?: string | undefined; joined?: string | undefined; lastModified?: string | undefined; posts?: string[] | undefined; bio?: string | undefined; photo?: string | undefined; }, "posts"> & { posts: ({ id: string; } & { title?: string | undefined; description?: string | undefined; content?: string | undefined; author?: string | undefined; thumbnail?: string | undefined; comments?: string[] | undefined; likes?: string[] | undefined; createdAt?: string | undefined; lastModified?: string | undefined; })[]; }) {
    return input
  } 
}