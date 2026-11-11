// description.md 한 파일에 한국어(ko)와 영어(en) 설명을 함께 담는다.
// 구분 마커 <!-- en --> 앞부분은 ko, 뒷부분은 en. 마커가 없으면 전체를 ko로 본다.
// 반환값은 기존 longDescription 형태({ ko, en })와 같아서 AlgorithmDetailPage는 바꿀 필요가 없다.
const EN_MARKER = '<!-- en -->'

export function parseDescription(raw) {
  // 파일 줄바꿈이 CRLF여도 LF로 맞춰서 읽는다
  const md = raw.replace(/\r\n/g, '\n')
  const idx = md.indexOf(EN_MARKER)
  if (idx === -1) return { ko: md.trim(), en: '' }
  return {
    ko: md.slice(0, idx).trim(),
    en: md.slice(idx + EN_MARKER.length).trim(),
  }
}
