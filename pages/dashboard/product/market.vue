<!--
MIT License

Copyright (c) 2023 radix-vue

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
--->
<script setup>
import { cn } from "@/lib/utils";
const countries = [
  // Africa
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",

  // Asia
  "Afghanistan",
  "Armenia",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "China",
  "Cyprus",
  "Georgia",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Lebanon",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar (Burma)",
  "Nepal",
  "North Korea",
  "Oman",
  "Pakistan",
  "Palestine",
  "Philippines",
  "Qatar",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Sri Lanka",
  "Syria",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Turkmenistan",
  "United Arab Emirates",
  "Uzbekistan",
  "Vietnam",
  "Yemen",

  // Europe
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kazakhstan",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "Vatican City",

  // North America
  "Antigua and Barbuda",
  "Bahamas",
  "Barbados",
  "Belize",
  "Canada",
  "Costa Rica",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "El Salvador",
  "Grenada",
  "Guatemala",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "United States",

  // South America
  "Argentina",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Guyana",
  "Paraguay",
  "Peru",
  "Suriname",
  "Uruguay",
  "Venezuela",

  // Oceania
  "Australia",
  "Fiji",
  "Kiribati",
  "Marshall Islands",
  "Micronesia",
  "Nauru",
  "New Zealand",
  "Papua New Guinea",
  "Samoa",
  "Solomon Islands",
  "Tonga",
  "Tuvalu",
  "Vanuatu",
];

const invoices = [
  {
    productName: "Cangkir Keramik",
    status: {
      isGoingUp: true,
      percentage: 6.75,
    },
    price: "Rp250.00",
    country: "Singapura",
  },
  {
    productName: "Rendang",
    status: {
      isGoingUp: false,
      percentage: 42.5,
    },
    price: "Rp150.00",
    country: "Malaysia",
  },
  {
    productName: "Kerajinan Kayu",
    status: {
      isGoingUp: true,
      percentage: 1.5,
    },
    price: "Rp350.00",
    country: "Arab Saudi",
  },
  {
    productName: "Batik",
    status: {
      isGoingUp: false,
      percentage: 60.55,
    },
    price: "Rp450.00",
    country: "Inggris",
  },
  {
    productName: "Penghangat",
    status: {
      isGoingUp: false,
      percentage: 5.89,
    },
    price: "Rp550.00",
    country: "Russia",
  },
  {
    productName: "Kipas Angin",
    status: {
      isGoingUp: false,
      percentage: 8.56,
    },
    price: "Rp200.00",
    country: "Nigeria",
  },
  {
    productName: "Daun Pisang",
    status: {
      isGoingUp: true,
      percentage: 6.75,
    },
    price: "Rp300.00",
    country: "Afrika Selatan",
  },
];
const messages = ref([]);
const input = ref("");
const inputLength = computed(() => input.value.trim().length);

async function fetchAnswer() {
  try {
    const response = await $fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          authorization:
            "Bearer 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",
        },
        body: {
          messages: [
            {
              role: "system",
              content: `Anda adalah pembantu investor dan UMKM untuk ekspor`,
            },
            ...messages.value,
          ],
          stream: false,
          model: "llama-3.1-70b-versatile",
        },
      }
    );
    messages.value.push(response.choices[0].message);
  } catch {}
}
const selectedCountry = ref("");
const productName = ref("");
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>
      <section class="border border-indigo-800 p-5 min-h-screen">
        <Input
          type="text"
          placeholder="Masukkan nama produk"
          v-model="productName"
        />
        <Select v-model="selectedCountry">
          <SelectTrigger>
            <SelectValue placeholder="Pilih negara tujuan ekspor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="country in countries" :value="country">{{
                country
              }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit"> Cari Permintaan </Button>
      </section>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>
      <section class="border border-indigo-800 min-h-screen p-5 rounded max-w-md">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chart-spline"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path
                      d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">Asisten Analisis</p>
                <p class="text-sm text-muted-foreground">
                  Diskusi pasar dan tren global dengan
                  <i>Artificial Intelligence</i>
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                  cn(
                    'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                    message.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )
                "
              >
                {{ message.content }}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <form
              class="flex w-full items-center space-x-2"
              @submit.prevent="
                () => {
                  if (inputLength === 0) return;
                  messages.push({
                    role: 'user',
                    content: input,
                  });
                  input = ``;
                  fetchAnswer();
                }
              "
            >
              <Input
                v-model="input"
                placeholder="Kirim pesan..."
                class="flex-1"
              />
              <Button
                class="p-2.5 flex items-center justify-center"
                :disabled="inputLength === 0"
              >
                <LucideSend class="w-4 h-4" />
                <span class="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </section>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>
      <section class="border border-indigo-800 min-h-screen p-5 rounded">
        <h1 class="text-lg">Rekomendasi</h1>
        <Table>
          <TableCaption
            >Catatan: Data yang diberikan tidak 100% akurat gunakan sebagai
            sudut pandang!</TableCaption
          >
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]"> Produk </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Negara</TableHead>
              <TableHead class="text-right"> Harga </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="invoice in invoices" :key="invoice.invoice">
              <TableCell class="font-medium">
                {{ invoice.productName }}
              </TableCell>
              <TableCell>
                <div
                  v-if="invoice.status.isGoingUp"
                  class="flex text-green-500"
                >
                  <LucideTrendingUp />
                  <h2 class="ml-1">{{ invoice.status.percentage }}%</h2>
                </div>
                <div v-else class="flex text-red-500">
                  <LucideTrendingDown />
                  <h2 class="ml-1">{{ invoice.status.percentage }}%</h2>
                </div>
              </TableCell>
              <TableCell>{{ invoice.country }}</TableCell>
              <TableCell class="text-right">
                {{ invoice.price }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
