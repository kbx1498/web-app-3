import React, { useState } from "react";
import MenuCard from "./MenuCard"; // 💡 방금 만든 MenuCard 컴포넌트를 불러옵니다.
import "./TopMenu.css";

function TopMenu() {
    /* 1. 통합 메뉴 데이터 */
    const initialTotalMenuList = [                                       
        { id: 1, name: "돈까스", price: "5000원", store: "가게명1" },
        { id: 2, name: "제육볶음", price: "4000원", store: "가게명1" },
        { id: 3, name: "치즈라면", price: "7000원", store: "가게명2" }, 
        { id: 4, name: "김치찌개", price: "6500원", store: "가게명2" },
        { id: 5, name: "짜장면", price: "5500원", store: "가게명3" },
        { id: 6, name: "된장찌개", price: "6000원", store: "가게명3" },
        { id: 7, name: "돌솥비빔밥", price: "8000원", store: "가게명4" },
        { id: 8, name: "잔치국수", price: "4500원", store: "가게명4" }
    ];

    /* 2. 상태(State) 정의 */
    const [selections, setSelections] = useState({});
    const [sortBy, setSortBy] = useState("popular");
    const [selectedStore, setSelectedStore] = useState("전체");

    /* 3. 버튼 클릭 처리 공통 함수 */
    const handleSelect = (menuId, category, value) => {
        setSelections((prev) => ({
            ...prev,
            [menuId]: {
                ...prev[menuId],
                [category]: prev[menuId]?.[category] === value ? null : value
            }
        }));
    };

    /* 4. 가격 문자열에서 숫자 추출 */
    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
    };

    /* 5. 인기메뉴 TOP3 추출 함수 */
    const getTop3Menus = () => {
        const filtered = initialTotalMenuList.filter(item => 
            selectedStore === "전체" || item.store === selectedStore
        );
        return filtered
            .sort((a, b) => {
                const aRecommend = selections[a.id]?.recommend ? 1 : 0;
                const bRecommend = selections[b.id]?.recommend ? 1 : 0;
                return bRecommend - aRecommend;
            })
            .slice(0, 3);
    };

    /* 6. 전체메뉴 필터링 및 정렬 함수 */
    const getFilteredAndSortedList = () => {
        let result = initialTotalMenuList.filter(item => 
            selectedStore === "전체" || item.store === selectedStore
        );
        return result.sort((a, b) => {
            if (sortBy === "popular") {
                const aRecommend = selections[a.id]?.recommend ? 1 : 0;
                const bRecommend = selections[b.id]?.recommend ? 1 : 0;
                return bRecommend - aRecommend;
            }
            if (sortBy === "priceLow") {
                return parsePrice(a.price) - parsePrice(b.price);
            }
            if (sortBy === "priceHigh") {
                return parsePrice(b.price) - parsePrice(a.price);
            }
            return 0;
        });
    };

    return (
        <div>
            {/* 1. 가게명 필터 구역 */}
            <div className="Store">
                {["전체", "가게명1", "가게명2", "가게명3", "가게명4"].map((storeName) => (
                    <button
                        key={storeName}
                        className={selectedStore === storeName ? "active-store" : ""}
                        onClick={() => setSelectedStore(storeName)}
                    >
                        {storeName}
                    </button>
                ))}
            </div>

            {/* 2. 정렬 순서 선택 구역 */}
            <select 
                className="Sort" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="popular">인기순</option>
                <option value="priceLow">가격 낮은 순</option>
                <option value="priceHigh">가격 높은 순</option>
            </select>

            {/* 3. 인기메뉴 TOP3 구역 */}
            <div className="Menu">
                <h3>인기메뉴 TOP3</h3>
                <div className="Menu-List-Wrapper">
                    {getTop3Menus().map((menu, index) => (
                        <MenuCard 
                            key={menu.id}
                            item={menu}
                            rank={`인기 ${index + 1}위`} // 💡 인기메뉴는 rank 값을 던져줍니다.
                            selections={selections}
                            onSelect={handleSelect}
                        />
                    ))}
                    {getTop3Menus().length === 0 && (
                        <p style={{margin: "20px auto", color: "#868e96"}}>등록된 메뉴가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 4. 전체 메뉴 구역 */}
            <div className="All-Menu-Section">
                <h3>전체 메뉴</h3>
                <div className="All-Menu-Grid">
                    {getFilteredAndSortedList().map((item) => (
                        <MenuCard 
                            key={item.id}
                            item={item}
                            rank={null} // 💡 전체메뉴는 rank 뱃지가 필요 없으므로 null을 던집니다.
                            selections={selections}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopMenu;