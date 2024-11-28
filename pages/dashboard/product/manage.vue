<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
const { userID, fetchUserDetails } = useAuth();
fetchUserDetails();
console.log(userID.value);
const products: Ref<any> = ref();
import { useNuxtApp } from "#app";

const { $supabase } = useNuxtApp();
const productModel = ref({
  name: "",
  description: "",
  image_url: "",
  price: 15000,
  stock: 0,
  status: "active",
  bucket_name: "product-images",
  user_id: userID.value,
});
function formatToCustomReadableDate(dateString: string) {
  const date = new Date(dateString);

  // Extract components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format as YYYY-MM-DD HH:MM AM/PM
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

const file = ref<File | null>(null); // To store the selected file

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

const addProduct = async () => {
  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await $supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not authenticated:", userError?.message);
      return alert("Please log in to add a product.");
    }

    if (!file.value) {
      return alert("Please upload an image.");
    }

    const fileName = `${Date.now()}_${file.value.name}`;
    const { data: uploadData, error: uploadError } = await $supabase.storage
      .from("primary")
      .upload(`product-images/${fileName}`, file.value);

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return alert("Failed to upload image.");
    }

    const {
      data: { publicUrl },
    } = $supabase.storage
      .from("primary")
      .getPublicUrl(`product-images/${fileName}`);

    if (!publicUrl) {
      console.error("Error generating public URL.");
      return alert("Failed to get public URL for the image.");
    }

    const newProduct = {
      ...productModel.value,
      image_url: publicUrl,
    };

    const { data, error } = await $supabase
      .from("products")
      .insert([newProduct]);

    if (error) {
      console.error("Error adding product:", error.message);
    } else {
      console.log("Product added successfully:", data);
      alert("Product added successfully!");
    }
  } catch (err) {
    console.error("Unexpected error adding product:", err);
  }
};
const fetchUserProducts = async (userId: string | null) => {
  try {
    // Query the products table filtering by user_id
    const { data, error } = await $supabase
      .from("products")
      .select("*")
      .eq("user_id", userId); // Filtering products by the user's ID

    if (error) {
      console.error("Error fetching user products:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};
products.value = await fetchUserProducts(userID.value);
</script>

<template>
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Tabs default-value="all">
      <div class="flex items-center">
        <TabsList>
          <TabsTrigger value="all"> All </TabsTrigger>
          <TabsTrigger value="active"> Active </TabsTrigger>
          <TabsTrigger value="draft"> Draft </TabsTrigger>
          <TabsTrigger value="archived" class="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-7 gap-1">
                <LucideListFilter class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem checked> Active </DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem> Archived </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" class="h-7 gap-1">
            <LucideFile class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button size="sm" class="h-7 gap-1">
                <LucidePlusCircle class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Buat Produk
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent
              class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
            >
              <DialogHeader class="p-6 pb-0">
                <DialogTitle>Buat Produk</DialogTitle>
                <DialogDescription>
                  Buat produk untuk perdagangan yang sukses
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Nama Produk"
                    v-model="productModel.name"
                  />
                  <Textarea
                    placeholder="Deskripsi Produk"
                    v-model="productModel.description"
                  />
                  <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label for="picture">Foto Produk</Label>
                    <Input
                      id="picture"
                      type="file"
                      @change="handleFileUpload"
                    />
                  </div>
                  {{ productModel.price }}
                  <NumberField
                    id="Harga Produk"
                    :min="0"
                    :format-options="{
                      style: 'currency',
                      currency: 'IDR',
                      currencyDisplay: 'code',
                      currencySign: 'accounting',
                    }"
                    v-model="productModel.price"
                  >
                    <Label for="Harga Produk">Harga Produk</Label>
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <NumberFieldInput />
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <NumberField id="stock" :default-value="20" :min="0">
                    <Label for="stock">Stok Barang</Label>
                    <NumberFieldContent>
                      <NumberFieldDecrement />
                      <NumberFieldInput />
                      <NumberFieldIncrement />
                    </NumberFieldContent>
                  </NumberField>
                  <Select v-model="productModel.status">
                    <SelectTrigger class="w-[180px]">
                      <SelectValue placeholder="Pilih status barang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter class="p-6 pt-0">
                <DialogClose as-child>
                  <Button @click="addProduct"> Buat Produk </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Kelola produk anda dan lihat laporan penjualan.
              {{ products }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="hidden w-[100px] sm:table-cell">
                    <span class="sr-only">img</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="hidden md:table-cell"> Price </TableHead>
                  <TableHead class="hidden md:table-cell"> Stock </TableHead>
                  <TableHead class="hidden md:table-cell">
                    Total Sales
                  </TableHead>
                  <TableHead class="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span class="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="product in products">
                  <TableCell class="hidden sm:table-cell">
                    <img
                      alt="Product image"
                      class="aspect-square rounded-md object-cover"
                      height="64"
                      :src="product.image_url"
                      width="64"
                    />
                  </TableCell>
                  <TableCell class="font-medium">
                    {{ product.name }}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{{ product.status }} </Badge>
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ product.price }}</TableCell
                  >
                  <TableCell class="hidden md:table-cell">
                    {{ product.stock }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ product.sales }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ formatToCustomReadableDate(product.created_on) }}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <LucideMoreVertical class="h-4 w-4" />
                          <span class="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div class="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong>
              products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </main>
</template>
