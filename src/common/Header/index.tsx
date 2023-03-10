import * as S from "./styled";
import { useState } from "react";
import { CategorySelect } from "..";
import { CategoryArray } from "../../utils/CategoryArray";
import { useRecoilState } from "recoil";
import { fieldStateAtom, filterCategoryAtom, filterObjectAtom, SearchValueAtom } from "../../atom";
import { useRouter } from "next/router";
import { SearchIcon } from "../../../public/svg";

const Header = () => {
  const router = useRouter();
  const [filterToggleBtn, setFilterToggleBtn ] = useState(false);
  const [filterCategoryArray, setFilterCategoryArray ] = useRecoilState<string[]>(filterCategoryAtom);
  const [field, setField] = useRecoilState(fieldStateAtom);
  const [filterObjectArray, setFilterObjectArray] = useRecoilState(filterObjectAtom);
  const [searchValue, SetSearchValue] = useRecoilState<string>(SearchValueAtom);

  const handleClick = () => {
    if(!searchValue) {
      setFilterCategoryArray([])
      return router.push('/')}
    router.push(`/search/${searchValue}`)
    setFilterToggleBtn(false)
  }
  
const handleCategorySelectClick = (name:string) => {
  if(!filterCategoryArray.includes(name)){
    setFilterCategoryArray([...filterCategoryArray, name])
    setFilterObjectArray([...filterObjectArray, {
      property: "Category",
      multi_select: {
      contains: name,
    },
    }])
  }else {
    const arr = filterCategoryArray.filter((i) => i !== name);
    const arr2 = filterObjectArray.filter((i) => i.multi_select.contains !== name);
    setFilterCategoryArray(arr);
    setFilterObjectArray(arr2);
  }
}

const handleSubmitBtnClick = () => {
  setFilterToggleBtn(false)
  if(filterCategoryArray.length === 0 && !field) {
    setFilterCategoryArray([])
    return router.push("/")
  } 
    
  const filterQuery = filterCategoryArray.join(' ')
  router.push(`/filter/${filterQuery} ${field}`)
}

const handleClickTogglrBtn = () => {
  setFilterToggleBtn(pre => !pre)
}

const handleTitleClick = () => {
  setFilterCategoryArray([])
  return router.push("/")
}

  return (
    <S.HeaderWapper>  
      <S.LeftWapper>
        <p onClick={handleTitleClick}>TIM</p>
      </S.LeftWapper>
       <S.CenterWrapper>
        <S.InputWapper>
          <input type="text" placeholder="??????/????????? ????????? ???????????????" value={searchValue} onChange={(e) => SetSearchValue(e.target.value)}
              onKeyDown={(e:any) => {if (e.key === 'Enter'){handleClick()}}}
           />
          <label >
         <SearchIcon />
          </label>
        </S.InputWapper>
                   
        </S.CenterWrapper>
        <S.RightWrapper>
        <S.FilterBtn onClick={handleClickTogglrBtn}>????????????</S.FilterBtn>
        {
            filterToggleBtn &&
            <S.FilterBox>
              <S.BoxTop>
              {
                CategoryArray.map((i,index) => (
                    <CategorySelect    
                        onClick={() => handleCategorySelectClick(i)} 
                        key={index} 
                        name={i}
                        isClick={filterCategoryArray.includes(i)}
                    />
                ))
              }
              </S.BoxTop>
              <S.BoxBottom>
                <S.TagBtns>
                  <input defaultChecked type="radio" value={""} id="??????" name="??????" onClick={() => setField("")}/>
                  <label htmlFor="??????" style={{borderBottomLeftRadius:"6px"}}>??????</label>
                  <input type="radio" value={field} id="??????" name="??????" onClick={() => setField("??????")}/>
                  <label htmlFor="??????">??????</label>
                  <input type="radio" value={field} id="?????????" name="??????" onClick={() => setField("?????????")}/>
                  <label htmlFor="?????????">?????????</label>
                </S.TagBtns>
                <S.SubmitBtn>
                  <button onClick={handleSubmitBtnClick}>??????</button>
                </S.SubmitBtn>
              </S.BoxBottom>
            </S.FilterBox>
          }
        </S.RightWrapper>
    </S.HeaderWapper>
  )
}

export default Header