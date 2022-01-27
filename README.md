Theory (KU3.2)

The difference between storing variables on memory or on storage.

Variables are declared and utilised within smart contracts representing the data
location. The storage is referred to as the global memory available to the functions
within the contract. Every node within the ethereum environment is stored within the
storage as permanent storage. Furthermore, the memory is referred to as a local memory
that is made available to the functions within the contract. The memory is a non-permanent
memory, a temporary memory location where variables are cleared once the respective functions
complete the execution. The state variables are always stored within the storage data location
while the function parameter variables are always stored within the memory data location. In
relation to solidity development, a copy of the variable data is created in scenarios where the
storage type variable is assigned to memory. During execution, a smart contract is able to utilise
any amount of memory location while having persistent storage.
