// Fake API with latency, caching and localStorage persistence.
function seedIfEmpty() {
    if (!localStorage.getItem(LS_KEY_BOOKS)) {
        localStorage.setItem(LS_KEY_BOOKS, JSON.stringify(seed.books))
    }
}


function loadAll() {
    if (memory) return memory
    seedIfEmpty()
    memory = JSON.parse(localStorage.getItem(LS_KEY_BOOKS) || '[]')
    return memory
}


function saveAll(list) {
    memory = list
    localStorage.setItem(LS_KEY_BOOKS, JSON.stringify(list))
}


const delay = (ms = 350) => new Promise(res => setTimeout(res, ms))


// Derive a lightweight category from subtitle/publisher for demo filters
function deriveCategory(b) {
    if (b.categories?.length) return b.categories[0]
    if (b.subtitle) return b.subtitle.split(' ')[0]
    return b.publisher?.split(' ')[0] || 'General'
}


export async function fetchBooks({ q = '', year, publisher, category } = {}) {
await delay()
const all = loadAll().map(b => ({ ...b, category: deriveCategory(b) }))
const text = q.trim().toLowerCase()
let result = all
if (text) {
    result = result.filter(b =>
    b.title.toLowerCase().includes(text) ||
    b.author.toLowerCase().includes(text)
)
}
if (year) result = result.filter(b => new Date(b.published).getFullYear() === Number(year))
if (publisher) result = result.filter(b => b.publisher === publisher)
if (category) result = result.filter(b => deriveCategory(b) === category)
    return result
}


export async function getBookByIsbn(isbn) {
await delay()
const all = loadAll()
const found = all.find(b => b.isbn === isbn)
if (!found) throw new Error('Book not found')
    return found
}


export async function createBook(data) {
await delay(500)
const all = loadAll()
// Ensure unique ISBN (simple check)
if (all.some(b => b.isbn === data.isbn)) {
    throw new Error('A book with this ISBN already exists')
}
const created = { ...data }
    saveAll([created, ...all])
    return created
}