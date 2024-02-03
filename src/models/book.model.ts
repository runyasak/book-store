export interface RequestBookInput {
  title: string
  authorId: number
  coverImageUrl: string
  rating: number
  description: string
}

export interface MuationUpdateBookResponse {
  data: {
    updateBook: {
      bookId: number
      __typename: string
    }
  }
}

export interface MutationUpdateBookVariable {
  bookId: number
  requestBookInput: {
    title: string
    authorId: number
    coverImageUrl: string
    rating: number
    description: string
  }
}

export interface QueryBookEditDetail {
  books: {
    title: string
    authorId: number
    coverImageUrl: string
    rating: number
    description: string
    __typename: string
  }[]
}

export interface QueryBooks {
  books: {
    __typename: string
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    author: {
      __typename: string
      name: string
    }
  }[]
}

export interface QueryBooksPagination {
  booksPagination: {
    nodes: {
      __typename: string
      bookId: number
      title: string
      coverImageUrl: string
      publishedDate: string
      author: {
        __typename: string
        name: string
      }
    }[]
    pageInfo: {
      __typename: string
      startCursor: string
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

export interface AddNewBookResult {
  data: { addBook: { bookId: number; __typename: string } }
}

export interface RequestBookInputVariable {
  requestBookInput: RequestBookInput
}

export interface QueryBooksById {
  books: {
    __typename: string
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    rating: number
    description: string
    author: {
      __typename: string
      name: string
    }
  }[]
}

export interface DeleteBookByIdResponse {
  data: {
    deleteBook: boolean
  }
}
