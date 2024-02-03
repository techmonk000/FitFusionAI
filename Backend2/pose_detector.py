import cv2
import mediapipe as mp
import time
import math

class poseDetector():
    def __init__(self, mode=False, upBody=False, smooth=True,
                 detectionCon=0.5, trackCon=0.5):
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.detectionCon = detectionCon
        self.trackCon = trackCon

        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.upBody, bool(self.smooth),
                                     bool(self.detectionCon), bool(self.trackCon))
        self.lmList = []

    def findPose(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks,
                                           self.mpPose.POSE_CONNECTIONS)
        return img

    def findPosition(self, img, draw=True):
        self.lmList = []
        if self.results.pose_landmarks:
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                self.lmList.append([id, cx, cy])
                if draw:
                    cv2.circle(img, (cx, cy), 15, (255, 0, 0), cv2.FILLED)
        print(f"lmList: {self.lmList}")
        return self.lmList

    def findAngle(self, img, p1, p2, p3, draw=True):
        print(f"Landmarks: {self.lmList}")
        x1, y1 = self.lmList[p1][1:]
        x2, y2 = self.lmList[p2][1:]
        x3, y3 = self.lmList[p3][1:]

        print(f"Landmark {p1}: ({x1}, {y1})")
        print(f"Landmark {p2}: ({x2}, {y2})")
        print(f"Landmark {p3}: ({x3}, {y3})")

        angle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                             math.atan2(y1 - y2, x1 - x2))
        angle=abs(angle)

        if draw:
            cv2.line(img, (x1, y1), (x2, y2), (255, 255, 255), 3)
            cv2.line(img, (x3, y3), (x2, y2), (255, 255, 255), 3)
            cv2.circle(img, (x1, y1), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
            cv2.circle(img, (x2, y2), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
            cv2.circle(img, (x3, y3), 10, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x3, y3), 15, (0, 0, 255), cv2.FILLED)
            cv2.putText(img, f"Angle: {int(angle)}", (x2-30, y2+30),
                        cv2.FONT_HERSHEY_PLAIN, fontScale=2,
                        color=(255,165, 0), thickness=3)

        return angle

def main():
    cap = cv2.VideoCapture(0)
    pTime = 0
    detector = poseDetector()
    
    while True:
        success, img = cap.read()
        img = detector.findPose(img)
        lmList = detector.findPosition(img, draw=False)
        
        if len(lmList) != 0:
            shoulder_angle_right = detector.findAngle(img, 12, 14, 16, draw=False)
            elbow_angle_right = detector.findAngle(img, 14, 16, 18, draw=False)
            knee_angle_right = detector.findAngle(img, 23, 25, 27, draw=False)
            
            shoulder_angle_left = detector.findAngle(img, 11, 13, 15, draw=False)
            elbow_angle_left = detector.findAngle(img, 13, 15, 17, draw=False)
            knee_angle_left = detector.findAngle(img, 24, 26, 28, draw=False)
            hip_angle = detector.findAngle(img, 11, 23, 24, draw=False)

            # Display angles in the pop-up window
            cv2.putText(img, f"Right Shoulder Angle: {int(shoulder_angle_right)}", (10, 30), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Right Elbow Angle: {int(elbow_angle_right)}", (10, 50), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Right Knee Angle: {int(knee_angle_right)}", (10, 70), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Left Shoulder Angle: {int(shoulder_angle_left)}", (10, 90), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Left Elbow Angle: {int(elbow_angle_left)}", (10, 110), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Left Knee Angle: {int(knee_angle_left)}", (10, 130), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)
            cv2.putText(img, f"Hip Angle: {int(hip_angle)}", (10, 150), cv2.FONT_HERSHEY_PLAIN, 1,
                        (255, 0, 0), 1)

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime

        cv2.putText(img, f"FPS: {int(fps)}", (70, 30), cv2.FONT_HERSHEY_PLAIN, 1,
                    (255, 0, 0), 1)

        cv2.imshow("Angles", img)
        cv2.waitKey(1)

if __name__ == "__main__":
    main()
