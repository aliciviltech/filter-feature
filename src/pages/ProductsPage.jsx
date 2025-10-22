import React, { useState } from 'react'
import { AllProducts } from '../../utils/AllProducts'

const FilterCategories = ['kurta', 'kids', 'shirts', 'pants', 'men', 'women', 'shoes']

const ProductsPage = () => {

    const [displayProducts, setDisplayProducts] = useState(AllProducts)
    const [isFilterOn, setIsFilterOn] = useState(false)
    const [filterToggle, setFilterToggle] = useState(false)
    const [selectedInputs, setSelectedInputs] = useState({})

    const handleFilter = (e) => {
        const updatedInputs = { ...selectedInputs, [e.target.name]: !selectedInputs[e.target.name] }
        setSelectedInputs(updatedInputs)
        const activeFilters = Object.keys(updatedInputs).filter(key => updatedInputs[key])
        if (activeFilters.length === 0) {
            setDisplayProducts(AllProducts)
            setIsFilterOn(false)
            return
        }
        setIsFilterOn(true)
        const filteredProducts = AllProducts.filter(p => activeFilters.includes(p.category) || activeFilters.includes(p.type))
        setDisplayProducts(filteredProducts)
    }

    const handleToggle = ()=>{
        setFilterToggle(!filterToggle)
    }




    return (
        <div className='p-10 relative w-full flex gap-10 bg-gray-100'>


            {/* left side */}
            <div className={`leftside absolute top-0 ${filterToggle ? 'left-[0]' : 'left-[-200px]'}  md:static md:block w-[20%] min-h-screen w-[200px] bg-gray-200 p-4 transition-all`}>
                <h1 className='mb-4 flex justify-between'>Filters <span className='md:hidden font-bold text-xl' onClick={handleToggle}>x</span> </h1>
                {/* check box input fields */}
                {
                    FilterCategories.map((cat, i) => (
                        <div key={i} className='flex items-center gap-2'>
                            <input type="checkbox" name={cat} id={cat} onChange={handleFilter} />
                            <label htmlFor={cat}>{cat}</label>
                        </div>
                    ))
                }
            </div>




            {/* right side */}

            <div className="rightSide md:w-[80%]">
                <div className='md:hidden mb-10' onClick={handleToggle}>Filter Toggle</div>

                {
                    isFilterOn &&
                    <h1 className='mb-6 p-2 bg-gray-200'>Filtered Products:</h1>
                }

                <div className="flex gap-6 flex-wrap justify-center">
                    {
                        displayProducts.map((product, i) => {
                            return (
                                <div key={product.id} className='w-[220px] h-[300px] bg-white shadow-sm rounded-md overflow-hidden'>
                                    <div className="image w-full h-[250px] bg-red-300">
                                        <img src={product.imageURL} alt="" className='w-full h-full object-cover' />
                                    </div>
                                    <div className="text p-2">
                                        <h1 className='text-center'>{product.name}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsPage