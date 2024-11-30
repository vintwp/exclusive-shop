CREATE TABLE "brand"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "itemType_id" INTEGER NOT NULL
);
ALTER TABLE
    "brand" ADD PRIMARY KEY("id");
CREATE TABLE "itemSpecification"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "seriesGroup" BOOLEAN NOT NULL
);
ALTER TABLE
    "itemSpecification" ADD PRIMARY KEY("id");
CREATE TABLE "itemType"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL
);
ALTER TABLE
    "itemType" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
    "id" INTEGER NOT NULL,
    "oauthid" TEXT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "basket" BIGINT NOT NULL,
    "wishlist" BIGINT NOT NULL,
    "rating" BIGINT NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "itemImage"(
    "id" INTEGER NOT NULL,
    "image" TEXT NOT NULL
);
ALTER TABLE
    "itemImage" ADD PRIMARY KEY("id");
CREATE TABLE "wishlist"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "wishlistItem_id" INTEGER NOT NULL
);
ALTER TABLE
    "wishlist" ADD PRIMARY KEY("id");
CREATE TABLE "item"(
    "id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "itemType_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "itemSpecification_id" INTEGER NOT NULL,
    "itemImage_id" INTEGER NOT NULL,
    "seriesKey" TEXT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL
);
ALTER TABLE
    "item" ADD PRIMARY KEY("id");
CREATE TABLE "cart"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cartItem_id" INTEGER NOT NULL
);
ALTER TABLE
    "cart" ADD PRIMARY KEY("id");
CREATE TABLE "cartItem"(
    "id" INTEGER NOT NULL,
    "item_Id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL
);
ALTER TABLE
    "cartItem" ADD PRIMARY KEY("id");
CREATE TABLE "wishlistItem"(
    "id" INTEGER NOT NULL,
    "item_Id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL
);
ALTER TABLE
    "wishlistItem" ADD PRIMARY KEY("id");
CREATE TABLE "store"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "store" ADD PRIMARY KEY("id");
ALTER TABLE
    "itemType" ADD CONSTRAINT "itemtype_store_id_foreign" FOREIGN KEY("store_id") REFERENCES "store"("id");
ALTER TABLE
    "wishlist" ADD CONSTRAINT "wishlist_wishlistitem_id_foreign" FOREIGN KEY("wishlistItem_id") REFERENCES "wishlistItem"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_itemtype_id_foreign" FOREIGN KEY("itemType_id") REFERENCES "itemType"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_itemimage_id_foreign" FOREIGN KEY("itemImage_id") REFERENCES "itemImage"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_brand_id_foreign" FOREIGN KEY("brand_id") REFERENCES "brand"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_itemspecification_id_foreign" FOREIGN KEY("itemSpecification_id") REFERENCES "itemSpecification"("id");
ALTER TABLE
    "cart" ADD CONSTRAINT "cart_cartitem_id_foreign" FOREIGN KEY("cartItem_id") REFERENCES "cartItem"("id");
ALTER TABLE
    "wishlist" ADD CONSTRAINT "wishlist_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "wishlistItem" ADD CONSTRAINT "wishlistitem_item_id_foreign" FOREIGN KEY("item_Id") REFERENCES "item"("id");
ALTER TABLE
    "cart" ADD CONSTRAINT "cart_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "cartItem" ADD CONSTRAINT "cartitem_item_id_foreign" FOREIGN KEY("item_Id") REFERENCES "item"("id");
ALTER TABLE
    "item" ADD CONSTRAINT "item_store_id_foreign" FOREIGN KEY("store_id") REFERENCES "store"("id");