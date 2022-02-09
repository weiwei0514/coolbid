/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import '../../SASS/from.scss'
import '../../SASS/Components.scss'
// import Breadcrumbs from '../Main/Breadcrumbs'
import SellerBackendList from '../Main/SellerBackendList'

function SetStoreInfo() {
  // const [data, setData] = useState(
  const data = [{ StoreTitle: '', pic: '', description: '' }]

  // 文字預設空字串
  const [descWord, setDescWord] = useState('')
  console.log(descWord)

  return (
    <div className="sellerBackend_Member_Wrap">
      <div className="sellerBackend_Member_Container">
        <div className="backstageLeft">
          <SellerBackendList />
        </div>

        <div className="backstageRight">
          <div className="backstageRightContainer">
            <div className="breadcrumbsArea">
              賣家專區/賣場設定
              {/* <Breadcrumbs /> */}
            </div>
            <div className="form_warp">
              <form>
                <div className="form_row">
                  <label>
                    賣場名稱:
                    <br />
                    <TextField
                      label="賣場名稱"
                      value={data.StoreTitle}
                      name="StoreTitle"
                      variant="outlined"
                      className="mininput"
                    />
                  </label>
                </div>

                <div className="form_row">
                  <label>
                    匯率設定:&emsp;&emsp;
                    <TextField
                      label="美金匯率"
                      name="StoreTitle"
                      variant="outlined"
                    />
                  </label>
                </div>
                <div className="form_row">
                  <label>
                    賣場圖片:&emsp;
                    <input type="file"></input>
                    <p></p>
                  </label>
                </div>

                <div className="form_row">
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold', margin: '2rem 0 1rem' }}
                  >
                    賣場描述：
                  </Typography>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      setDescWord(editor.getData())
                    }}
                  />
                  {/* <TextField
                    label="賣場描述"
                    value={data.description}
                    name="description"
                    variant="outlined"
                    className="txtinput"
                    multiline={true}
                    rows="6"
                  /> */}
                </div>
                <input type="submit" value="提交" className="button" />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetStoreInfo
