class BloomFilter {
 constructor(size, hashFunctions) {
   this.size = size;
   this.hashFunctions = hashFunctions;
   this.bits = new Array(size).fill(0);
 }
 add(item) {
  for (let i = 0; i < this.hashFunctions.length; i++) {
   const hashValue = this.hashFunctions[i](item);
   const index = hashValue % this.size;
   this.bits[index] |= 1 << hashValue;
  }
 }
 contains(item) {
  for (let i = 0; i < this.hashFunctions.length; i++) {
   const hashValue = this.hashFunctions[i](item);
   const index = hashValue % this.size;
   if ((this.bits[index] & 1 << hashValue) === 0) {
    return false;
   }
  }
  return true;
 }
}

function hash(item) {
 let hash = 0;
 for (let i = 0; i < item.length; i++) {
  hash = (hash << 5) + hash + item.charCodeAt(i);
  hash = hash & hash;
  hash = Math.abs(hash);
 }
 return hash;
}

const bloomFilter = new BloomFilter(1000, [hash]);

bloomFilter.add("hello");
bloomFilter.add("world");
bloomFilter.add("hi");
bloomFilter.add("aasdf");
bloomFilter.add("test123");
bloomFilter.add("test1234");
bloomFilter.add("1234");
bloomFilter.add("password");

console.log(bloomFilter.contains("hello"));    // true
console.log(bloomFilter.contains("world"));    // true
console.log(bloomFilter.contains("hi"));       // true
console.log(bloomFilter.contains("aasdf"));    // true
console.log(bloomFilter.contains("test123"));  // true
console.log(bloomFilter.contains("test1234")); // true
console.log(bloomFilter.contains("1234"));     // true
console.log(bloomFilter.contains("password")); // true
console.log(bloomFilter.contains("password1"));// false
