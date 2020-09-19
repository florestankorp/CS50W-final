import React, { useEffect } from 'react';

export function Uploader(params: any): any {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/')
      .then(
        (res) => res.json(),
        (error) => {
          console.error(error);
        }
      )
      .then((result) => {
        console.log(result);
      });
  });

  return <p>Hello World</p>;
}
