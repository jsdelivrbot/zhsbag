package com.zhskg.bag.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;


public class ByteArrayUtil {
    /**
     * 输入流转化为Byte数组
     *
     * @param input
     * @return
     * @throws IOException
     */
    public static byte[] toByteArray(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int n = 0;
        while (-1 != (n = input.read(buffer))) {
            output.write(buffer, 0, n);
        }
        return output.toByteArray();
    }
}
