# 프로젝트 - Eroom Now

## 🚩 목차

1. 프로젝트 소개

2. 기획 배경

3. 사용 기술

4. 기능 소개

5. 성과

## 🚑 1. 프로젝트 소개

-   한 줄 설명 : **실시간** 응급실 정보 조회 서비스

-   서비스명 : Eroom Now

-   인원 : 1인

-   기간 : 2022.10 ~ 2022.12 (리팩토링 2024.11)

-   배포URL : https://ukal5006.github.io/eroom-now/

## 🚑 2. 개발 배경

소방서에서 복무하면서 구급대 반장님들이 응급실의 가용 침상 수를 확인하기 위해 응급실에 전화를 걸어서 확인하는 과정이 불편해 보였고 시간이 오래 걸렸습니다. 이 문제를 해결하기 위해서 개발하게 됐습니다.

## 🚑 3. 사용 기술

-   **프론트엔드** : React, TypeScript, Styled-Components, Axios

-   **외부 API** : 공공데이터 포털 전국 응급의료기관 정보 조회 API, 카카오 맵 API, 카카오 모빌리티 API

## 🚑 4. 기능 소개

### 1. 사용자 인근 응급실 및 가용 침상 수 조회

-   사용자는 버튼을 통해 5km, 10km, 15km 내에 있는 응급실의 리스트를 거리순으로 조회 할 수 있습니다.

-   버튼을 통해 응급실 리스트를 새로고침 할 수 있습니다.

-   응급실의 리스트는 응급실의 이름, 실시간 가용 침상 수, 거리를 표시합니다.

-   실시간 가용 침상 수에 따라 녹색, 주황색, 빨간색, 회색으로 표시됩니다.

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/a9b28c5b-b080-471e-9f61-faf90a0262d5" width="200" height="400"/>
  <img src="https://github.com/user-attachments/assets/0f14e0d6-57ec-4313-8784-1dafa3d03282" width="200" height="400"/>
  <img src="https://github.com/user-attachments/assets/1d100ff5-e3c0-45a2-8983-c3a1eff60b4e" width="200" height="400"/>
</div>

### 2. 응급실 기본 정보 및 예상 이동 정보 조회

-   응급실을 클릭하면 모달을 통해 응급실의 기본 정보 및 예상 이동 정보를 조회할 수 있습니다.

-   지도를 통해 현재 사용자의 위치와 응급실의 위치를 확인할 수 있습니다.

-   응급실의 기본 정보인 이름, 주소, 거리, 전화번호, 가용 침상 수를 확인할 수 있습니다.

-   전화번호 옆의 수화기 버튼을 통해 전화를 걸 수 있습니다.

-   예상 이동 시간 및 예상 택시비를 확인할 수 있습니다.

<div style="display: flex;">
  <img src="https://github.com/user-attachments/assets/c76feaf9-a983-4603-a8e2-a0335b85f836" width="200" height="400"/>
  <img src="https://github.com/user-attachments/assets/b061063b-84fe-4b25-9edb-a01e9799c93c" width="200" height="400"/>
</div>

## 🚑 5. 성과

### 응급실 선정 시간 40%이상 단축

-   응급실의 가용 침상 수 조회 시간 단축으로 응급실 선정 시간 40%이상 단축
-   소방서장님께 표창장을 수상
