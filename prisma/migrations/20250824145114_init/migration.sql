-- CreateTable
CREATE TABLE "public"."genre_tbl" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genre_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."author_tbl" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "author_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."book_tbl" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "genre_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."review_tbl" (
    "id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_tbl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genre_tbl_name_key" ON "public"."genre_tbl"("name");

-- CreateIndex
CREATE UNIQUE INDEX "author_tbl_name_key" ON "public"."author_tbl"("name");

-- AddForeignKey
ALTER TABLE "public"."book_tbl" ADD CONSTRAINT "book_tbl_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genre_tbl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review_tbl" ADD CONSTRAINT "review_tbl_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."author_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review_tbl" ADD CONSTRAINT "review_tbl_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
