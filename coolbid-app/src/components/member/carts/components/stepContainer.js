/* eslint-disable space-before-function-paren */
import React from 'react'
import styled from '@emotion/styled'
const StepOutter = styled.div`
  width: 80%;
  display: flex;
  margin: 2rem auto;
  .step1 {
    background-color: #ffb802e6;
    color: white;
    border: #f4ab0a 0.3rem solid;
    border-radius: 1rem;
  }
`
const Step = styled.div`
  display: flex;
  padding: 1rem;
  width: 30%;
  text-align: center;
  border: black 0.3rem solid;
  border-radius: 1rem;
  margin: 2rem;
  .number {
    width: 20%;
    font-size: 4.5rem;
  }
  .info {
    font-size: 2rem;
  }
`
export default function StepContainer() {
  return (
    <StepOutter>
      <Step className="step1">
        <div className="number">
          <span className="stepNum">01</span>
        </div>
        <div className="info">
          <p className="line">確認清單及選擇付款方式</p>
          <p className="line">Cart &amp; Check out</p>
        </div>
      </Step>
      <Step className="step2">
        <div className="number">
          <span className="stepNum">02</span>
        </div>
        <div className="info">
          <p className="line">填寫訂購資料</p>
          <p className="line">Shipping &amp; Biling info</p>
        </div>
      </Step>
      <Step className="step3">
        <div className="number">
          <span className="stepNum">03</span>
        </div>
        <div className="info">
          <p className="line">購物完成！</p>
          <p className="line">Order completed</p>
        </div>
      </Step>
    </StepOutter>
  )
}
