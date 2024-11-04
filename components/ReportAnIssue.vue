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
-->
<script setup>
const email = ref()
const fullName = ref()
const subject = ref()
const description = ref()
const category = ref()
const securityLevel = ref()
function submitReport() {
  
}
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Report an issue</CardTitle>
      <CardDescription>
        What area are you having problems with?
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="area">Area</Label>
          <Select default-value="billing" v-model="category">
            <SelectTrigger id="area">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">
                Team
              </SelectItem>
              <SelectItem value="billing">
                Billing
              </SelectItem>
              <SelectItem value="account">
                Account
              </SelectItem>
              <SelectItem value="deployments">
                Deployments
              </SelectItem>
              <SelectItem value="support">
                Support
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="security-level">Security Level</Label>
          <Select default-value="2" v-model="securityLevel">
            <SelectTrigger
              id="security-level"
              class="w-full truncate"
            >
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Severity 1 (Highest)
              </SelectItem>
              <SelectItem value="2">
                Severity 2
              </SelectItem>
              <SelectItem value="3">
                Severity 3
              </SelectItem>
              <SelectItem value="4">
                Severity 4 (Lowest)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
          id="email"
          placeholder="Ex. hello@example.com"
          v-model="email"
          />
        </div>
        <div class="grid gap-2">
          <Label for="fullname">Full Name</Label>
          <Input
          id="fullname"
          placeholder="Ex. John Doe"
          v-model="fullName"
          />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="subject">Subject</Label>
        <Input id="subject" placeholder="I need help with..." v-model="subject" />
      </div>
      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please include all information relevant to your issue."
          v-model="description"
        />
      </div>
    </CardContent>
    <CardFooter class="flex-1">
      <Button class="w-[100%]" @click="submitReport()">Submit</Button>
    </CardFooter>
  </Card>
</template>