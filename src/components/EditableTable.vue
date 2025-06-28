<template>
    <div class="p-8">
        <h2 class="text-2xl font-bold mb-6">Tabel Editable</h2>

        <div class="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead v-for="col in columns" :key="col">
                            {{ col }}
                        </TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="item in items" :key="item.id">
                        <!-- Kolom ID -->
                        <TableCell>{{ item.id }}</TableCell>

                        <!-- Kolom Name -->
                        <TableCell>
                            <div v-if="editingId !== item.id">{{ item.name }}</div>
                            <div v-else class="space-y-2">
                                <Input v-model="item.name" @blur="saveItem(item)" />
                                <Label v-if="errors[item.id]?.name" class="text-red-500 text-sm">
                                    {{ errors[item.id].name }}
                                </Label>
                            </div>
                        </TableCell>

                        <!-- Kolom Price -->
                        <TableCell>
                            <div v-if="editingId !== item.id">{{ item.price }}</div>
                            <div v-else class="space-y-2">
                                <Input v-model.number="item.price" type="number" @blur="saveItem(item)" />
                                <Label v-if="errors[item.id]?.price" class="text-red-500 text-sm">
                                    {{ errors[item.id].price }}
                                </Label>
                            </div>
                        </TableCell>

                        <!-- Kolom Aksi -->
                        <TableCell>
                            <Button v-if="editingId !== item.id" variant="outline" size="sm" @click="editItem(item)">
                                Edit
                            </Button>
                            <Button v-else variant="outline" size="sm" @click="saveItem(item)">
                                Save
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script>
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default {
    name: 'EditableTable',
    data() {
        return {
            items: [
                { id: 1, name: 'Item 1', price: 100 },
                { id: 2, name: 'Item 2', price: 200 },
                { id: 3, name: 'Item 3', price: 300 }
            ],
            columns: ['id', 'name', 'price'],
            editingId: null, // Menyimpan ID item yang sedang diedit
            errors: {}
        }
    },
    methods: {
        // Fungsi untuk mengaktifkan mode edit
        editItem(item) {
            this.editingId = item.id;
        },
        // Fungsi untuk menyimpan perubahan
        saveItem(item) {
            if (this.validateItem(item)) {
                this.editingId = null; // Hanya simpan jika valid
            }
            // Jika tidak valid, biarkan tetap dalam mode edit
        },
        validateItem(item) {
            this.errors[item.id] = {}; // Reset error sebelumnya

            // Validasi 1: Nama tidak boleh kosong
            if (!item.name.trim()) {
                this.errors[item.id].name = 'Nama tidak boleh kosong';
            }

            // Validasi 2: Price harus angka positif
            if (isNaN(item.price) || item.price <= 0) {
                this.errors[item.id].price = 'Harga harus angka > 0';
            }

            // Cek apakah ada error
            return Object.keys(this.errors[item.id]).length === 0;
        },
    },
    components: {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
        Button,
        Input,
        Label
    }
}
</script>

<style scoped></style>