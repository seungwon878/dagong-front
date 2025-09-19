exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // OPTIONS 요청 처리
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // GET 요청만 허용
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { code } = event.queryStringParameters || {};
    
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          isSuccess: false, 
          message: '카카오 인증 코드가 필요합니다.' 
        }),
      };
    }

    console.log('카카오 로그인 프록시 요청:', { code: code.substring(0, 10) + '...' });

    // 백엔드 서버로 요청 전달
    const backendUrl = `http://3.39.43.178:8080/auth/login/kakao?code=${encodeURIComponent(code)}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();
    
    console.log('백엔드 응답 상태:', response.status);
    console.log('백엔드 응답 데이터:', data.substring(0, 200));

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: data,
    };

  } catch (error) {
    console.error('카카오 로그인 프록시 에러:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        isSuccess: false,
        message: '서버 내부 오류가 발생했습니다.',
        error: error.message,
      }),
    };
  }
};
